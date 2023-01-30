import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
import { Repository } from "typeorm";

import {
  DuplicatedLoginIdException,
  NotFoundAdminException,
  NotFoundBoardsException,
} from "./admin.exception";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private boardService: BoardService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.findOneByLoginId(createAdminDto.loginId);

    if (admin) {
      throw new DuplicatedLoginIdException();
    }

    await this.isExsistBoards(
      createAdminDto.boards?.map((board) => board.boardId) ?? [],
    );

    return this.adminRepository.save({ ...createAdminDto });
  }

  findAll() {
    return this.adminRepository.find({ relations: { boards: true } });
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: { boards: true },
    });
    if (!admin) throw new NotFoundAdminException();

    return admin;
  }

  async findOneByLoginId(loginId: string) {
    const admin = await this.adminRepository.findOne({ where: { loginId } });

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    await this.isExsistBoards(
      updateAdminDto.boards?.map((board) => board.boardId) ?? [],
    );

    return this.adminRepository.save({ ...admin, ...updateAdminDto });
  }

  async remove(id: number) {
    const admin = await this.findOne(id);

    return this.adminRepository.remove(admin);
  }

  async isExsistBoards(ids: number[]) {
    const boards = await this.boardService.findByIds(ids);

    const notExistIds = ids.filter(
      (id) => !boards.find((board) => board.id === id),
    );

    if (notExistIds.length) throw new NotFoundBoardsException(notExistIds);

    return !notExistIds.length;
  }
}