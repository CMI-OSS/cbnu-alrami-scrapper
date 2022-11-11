import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TreeRepository } from "typeorm";

import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: TreeRepository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const parentBoard =
      createBoardDto.parentBoardId &&
      (await this.findOne(createBoardDto.parentBoardId));

    const board = this.boardRepository.create({
      ...createBoardDto,
      ...(parentBoard && { parent: parentBoard }),
    });

    return this.boardRepository.save(board);
  }

  findByIds(ids: number[]) {
    return this.boardRepository.createQueryBuilder().whereInIds(ids).getMany();
  }

  findAll() {
    return this.boardRepository.findTrees({
      relations: [ "children" ],
    });
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { parent: true, children: true },
    });
    if (!board) throw new NotFoundException("보드를 찾을 수 없습니다.");

    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
