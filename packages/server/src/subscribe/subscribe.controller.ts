import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/commons/decorators/public.decorator";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { SubscribeService } from "./subscribe.service";

@Public()
@Controller({
  path: "subscribe",
})
@ApiTags("[subscribe] 공지사항 사이트 구독 관련 API")
export class SubscribeControlelr {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post("boards/:boardId")
  @ApiOperation({
    summary: "공지사항 사이트 구독 API",
    description: "특정 board를 구독합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async findAll(@Req() req, @Param("boardId") boardId: number) {
    const { user } = req;
    return this.subscribeService.create(user, boardId);
  }
}