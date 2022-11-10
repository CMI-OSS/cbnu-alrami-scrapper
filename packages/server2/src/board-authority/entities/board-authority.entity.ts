import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { CommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BoardAuthorityType } from "../board-authority.constant";

@Entity()
export class BoardAuthority extends CommonEntity {
  @ManyToOne((type) => Admin, (admin) => admin.boards)
  @JoinColumn()
  admin: Admin;

  @ManyToOne((type) => Board)
  @JoinColumn()
  board: Board;

  @Column({
    type: "enum",
    enum: BoardAuthorityType,
  })
  authority: BoardAuthorityType;
}