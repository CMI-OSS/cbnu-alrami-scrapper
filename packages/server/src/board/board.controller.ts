import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardCreateDto } from "./dto/board.create.dto";
import { Board } from "../@entities/board.entity";

@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post("")
  async create(@Body() boardCreateDto: BoardCreateDto) {
    const board = await this.boardService.create(boardCreateDto);
    return board;
  }

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(":boardId")
  async findOne(@Param("boardId") boardId: number): Promise<Board> {
    return this.boardService.findById(boardId);
  }

  @Delete(":boardId")
  async remove(@Param("boardId") boardId: number) {
    const board = await this.boardService.findById(boardId);
    return this.boardService.remove(boardId);
  }
}
