import { Injectable } from "@nestjs/common";
import { Errors } from "src/common/exception/exception.global";
import { UnauthorizedException } from "src/common/exception/exception.response";
import { BoardRepository } from "./board.repository";
import { BoardCreateDto } from "./dto/board.create.dto";
import { Board } from "src/@entities/board.entity";

const { NO_DATA_IN_DB, DUPLICATE_BOARD_NAME, DUPLICATE_BOARD_URL } = Errors;

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(boardCreateDto: BoardCreateDto) {
    if (this.findByName(boardCreateDto.name)) throw DUPLICATE_BOARD_NAME;
    if (this.findByUrl(boardCreateDto.url)) throw DUPLICATE_BOARD_URL;

    return await this.boardRepository.save(boardCreateDto);
  }

  async findByName(name: string) {
    const board = await this.boardRepository
      .createQueryBuilder("board")
      .where("board.name = :name", { name })
      .getOne();

    if (!board) throw NO_DATA_IN_DB;
    return board;
  }

  async findByUrl(url: string) {
    const board = await this.boardRepository
      .createQueryBuilder("board")
      .where("board.url = :url", { url })
      .getOne();

    if (!board) throw NO_DATA_IN_DB;
    return board;
  }

  async findAll(): Promise<Board[]> {
    const boards:Board[] = await this.boardRepository.find();
    if(!Array.isArray(boards) || boards.length == 0) throw NO_DATA_IN_DB;
    return boards;
  }
}
