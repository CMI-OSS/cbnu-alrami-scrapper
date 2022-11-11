import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.boardService.findOne(id);
  }

  @Get()
  find() {
    return this.boardService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boardService.remove(+id);
  }
}
