import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Public } from "src/commons/decorators/public.decorator";
import { Board } from "src/commons/entities/board.entity";

import { BoardService } from "./board.service";
import { BoardCreateDto } from "./dto/board.create.dto";
import { BoardUpdateDto } from "./dto/board.update.dto";

@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @Public()
  @UsePipes(ValidationPipe)
  async create(@Body() boardCreateDto: BoardCreateDto) {
    const board = await this.boardService.create(boardCreateDto);
    return board;
  }

  @Get()
  @Public()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(":boardId")
  @Public()
  async findOne(@Param("boardId") boardId: number): Promise<Board> {
    return this.boardService.findById(boardId);
  }

  @Put(":boardId")
  @Public()
  @UsePipes(ValidationPipe)
  async update(
    @Param("boardId") boardId: number,
    @Body() boardUpdateDto: BoardUpdateDto,
  ): Promise<Board> {
    return this.boardService.update(boardId, boardUpdateDto);
  }

  @Delete(":boardId")
  @Public()
  async remove(@Param("boardId") boardId: number) {
    return this.boardService.remove(boardId);
  }
}
