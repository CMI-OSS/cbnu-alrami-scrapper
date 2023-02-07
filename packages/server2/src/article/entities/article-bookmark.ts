import { CommonEntity } from "src/common/entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

import { Article } from "./article.entity";

@Entity()
@Unique([ "article", "user" ])
export class ArticleBookmark extends CommonEntity {
  @ManyToOne(() => Article, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  article: Article;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}