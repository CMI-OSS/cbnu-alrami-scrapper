import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/entities/admin.entity";
import { ArticleModule } from "./article/article.module";
import { Article } from "./article/entities/article.entity";
import { BoardModule } from "./board/board.module";
import { Board } from "./board/entities/board.entity";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ () => configuration ],
    }),
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (configService: ConfigService) => ({
        ...configService.get("db"),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [ Article, Admin, Board ],
        synchronize: true,
      }),
      inject: [ ConfigService ],
    }),
    BoardModule,
    AdminModule,
  ],
  providers: [],
})
export class AppModule {}