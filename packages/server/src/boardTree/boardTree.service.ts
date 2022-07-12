import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardResponseDto } from "src/board/dto/board.response.dto";
import { BoardTree } from "src/commons/entities/boardTree.entity";
import { Subscribe } from "src/commons/entities/subscribe.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";
import { SubscribeService } from "src/subscribe/subscribe.service";

import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeAllResponseDto } from "./dto/boardTree.all.response.dto";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";

const { BOARD_ID_NOT_FOUND } = Errors;

@Injectable()
export class BoardTreeService {
  constructor(
    private readonly boardTreeRepository: BoardTreeRepository,
    private readonly subscribeService: SubscribeService,
  ) {}

  async findByBoard(boardId: number): Promise<BoardTree> {
    const boardTree = await this.boardTreeRepository.findOne({
      where: {
        board: boardId,
      },
      relations: [ "board", "parentBoard" ],
    });

    return boardTree;
  }

  async getBoardTree(boardId: number): Promise<BoardTreeResponseDto> {
    const boardTree = await this.findByBoard(boardId);
    if (typeof boardTree === "undefined") return null;
    let parent;
    if (boardTree.parentBoard === null) {
      parent = null;
    } else {
      parent = Builder(BoardResponseDto)
        .id(boardTree.parentBoard.id)
        .name(boardTree.parentBoard.name)
        .build();
    }

    return Builder(BoardTreeResponseDto)
      .id(boardTree.board.id)
      .name(boardTree.board.name)
      .parent(parent)
      .build();
  }

  async findAll(user: User) {
    const rootList: BoardTree[] = await this.boardTreeRepository.find({
      where: {
        parentBoard: null,
      },
      relations: [ "board", "parentBoard" ],
    });

    const response: BoardTreeAllResponseDto[] = [];

    await Promise.all(
      rootList.map(async (root) => {
        const children = await this.findChildren(root.board.id, user.id);
        response.push(
          Builder(BoardTreeAllResponseDto)
            .id(root.board.id)
            .name(root.board.name)
            .children(children)
            .build(),
        );
      }),
    );

    return response;
  }

  async findChildren(
    parentId: number,
    userId: number,
  ): Promise<BoardTreeAllResponseDto[]> {
    const children = await this.boardTreeRepository.find({
      where: {
        parentBoard: parentId,
      },
      relations: [ "board", "parentBoard" ],
    });

    const response: BoardTreeAllResponseDto[] = [];

    await Promise.all(
      children.map(async (child) => {
        const grandChildren: BoardTreeAllResponseDto[] =
          children.length > 0
            ? await this.findChildren(child.board.id, userId)
            : undefined;

        // DESCRIBE: 리프노드인 경우에만 url, board 구독 여부, 알림 여부을 보낸다.
        if (grandChildren !== undefined) {
          response.push(
            Builder(BoardTreeAllResponseDto)
              .id(child.board.id)
              .name(child.board.name)
              .children(grandChildren)
              .build(),
          );
        } else {
          // DESCRIBE: 구독 중인 board만 알림 받아볼 수 있음 -> 둘 다 디폴트 값 false
          let isSubscribing = false;
          let isNoticing = false;
          const subscribe: Subscribe =
            await this.subscribeService.findByUserAndBoard(
              userId,
              child.board.id,
            );

          // DESCRIBE: subscribe 존재하면 구독 true, 이후 알림 여부 확인
          if (typeof subscribe !== "undefined") {
            isSubscribing = true;
            isNoticing = subscribe.notice;
          }

          response.push(
            Builder(BoardTreeAllResponseDto)
              .id(child.board.id)
              .name(child.board.name)
              .url(child.board.url)
              .isSubscribing(isSubscribing)
              .isNoticing(isNoticing)
              .children(grandChildren)
              .build(),
          );
        }
      }),
    );

    return response.length === 0 ? undefined : response;
  }
}
