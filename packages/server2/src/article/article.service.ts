/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import { ArticleViewService } from "src/article-view/article.view.service";
import { BoardService } from "src/board/board.service";
import { ImageService } from "src/image/image.service";
import { User } from "src/user/entities/user.entity";
import { FindManyOptions, In, MoreThanOrEqual, Repository } from "typeorm";

import {
  DuplicatedArticleException,
  NotFoundArticleException,
} from "./article.exception";
import { CreateArticleDto } from "./dto/create-article.dto";
import {
  ResponseArticleDetailDto,
  ResponseArticlePageDto,
} from "./dto/response-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleBookmark } from "./entities/article-bookmark";
import { Article } from "./entities/article.entity";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleBookmark)
    private articleBookmarkRepository: Repository<ArticleBookmark>,
    @Inject(forwardRef(() => ArticleViewService))
    private articleViewService: ArticleViewService,
    private imageService: ImageService,
    private boardService: BoardService,
  ) {}

  async create({ imageIds, boardId, ...createArticleDto }: CreateArticleDto) {
    const board = await this.boardService.findOne(boardId);

    if (createArticleDto.url) {
      const article = await this.findOneByUrl(createArticleDto.url);

      if (article) {
        throw new DuplicatedArticleException();
      }
    }

    const images = await this.imageService.findImages(imageIds ?? []);

    const article = await this.articleRepository.save({
      ...createArticleDto,
      board,
      images,
    });

    return article;
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findBookmarkArticlePage(
    user: User,
    page: number,
    count: number,
  ): Promise<ResponseArticlePageDto> {
    const articlePage = await this.findArticlePage(page, count, {
      where: {
        bookmarkUsers: {
          user: {
            id: user.id,
          },
        },
      },
      relations: {
        bookmarkUsers: true,
        board: { parent: true },
        images: true,
      },
      order: {
        bookmarkUsers: {
          createdDateTime: "DESC",
        },
      },
    });

    return {
      ...articlePage,
      articles: articlePage.articles.map(
        ({ bookmarkUsers, ...article }) => article,
      ),
    };
  }

  async findSubscribeArticlePage(user: User, page: number, count: number) {
    const subscribeBoards = await this.boardService.getSubscribeBoards(user);

    return this.findArticlePage(page, count, {
      where: {
        board: {
          id: In(subscribeBoards.map((board) => board.id)),
        },
      },
    });
  }

  async findArticlePageByBoardId(
    boardId: number,
    page: number,
    count: number,
  ): Promise<ResponseArticlePageDto> {
    return this.findArticlePage(page, count, {
      where: {
        board: {
          id: boardId,
        },
      },
    });
  }

  async findArticlePage(
    page: number,
    count: number,
    option: FindManyOptions<Article>,
  ): Promise<ResponseArticlePageDto> {
    const articles: Article[] = await this.articleRepository.find({
      take: count,
      skip: (page - 1) * count,
      relations: {
        board: { parent: true },
        images: true,
      },
      order: {
        dateTime: "DESC",
      },
      // 'content'를 제외하기 위함
      select: [
        "id",
        "title",
        "url",
        "dateTime",
        "viewCount",
        "bookmarkCount",
        "createdDateTime",
        "updatedDateTime",
      ],
      ...option,
    });

    const totalArticleCount: number = option.where
      ? await this.articleRepository.countBy(option.where)
      : 0;

    const totalPageCount = Math.ceil(totalArticleCount / count);

    return {
      pagination: {
        currentPage: page,
        totalPageCount,
        totalItemCount: totalArticleCount,
        isEnd: totalPageCount <= page,
      },
      articles,
    };
  }

  async findOne(id: number, user?: User): Promise<ResponseArticleDetailDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        board: { parent: true },
        images: true,
      },
    });

    if (!article) throw new NotFoundArticleException();

    const { ..._ariticle } = article;

    return {
      ..._ariticle,
      isView: user
        ? await this.articleViewService.isView(article.id, user.id)
        : false,
      isBookmark: await this.isBookmark(article.id, user?.id),
    } as ResponseArticleDetailDto;
  }

  async isBookmark(articleId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;

    return !!(await this.articleBookmarkRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    }));
  }

  findOneByUrl(url: string) {
    return this.articleRepository.findOne({ where: { url } });
  }

  async update(
    id: number,
    { boardId, imageIds, ...updateArticleDto }: UpdateArticleDto,
  ) {
    const target = await this.findOne(id);

    const board = boardId && (await this.boardService.findOne(boardId));

    const article = {
      ...updateArticleDto,
      ...(board && { board }),
    };

    if (imageIds) {
      const images = await this.imageService.findImages(imageIds);
      target.images = images;
      target.save();
    }

    return this.articleRepository.update(target.id, article);
  }

  async updateViewCount(articleId: number) {
    await this.articleRepository.update(articleId, {
      viewCount: () => "view_count + 1",
    });
  }

  async remove(id: number) {
    const article = await this.findOne(id);

    return this.articleRepository.remove(article);
  }

  async bookmark(id: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) throw new NotFoundArticleException();

    return this.articleBookmarkRepository.save({ article, user });
  }

  async unbookmark(id: number, user: User) {
    const articleBookmark = await this.articleBookmarkRepository.findOne({
      where: { article: { id }, user: { id: user.id } },
    });

    if (!articleBookmark)
      throw new NotFoundException("북마크 하지 않은 게시물");

    return this.articleBookmarkRepository.remove(articleBookmark);
  }

  async findTopArticlesByHit(page: number, count: number) {
    // DESCRIBE: article 테이블에서 최근 2주 동안의 공지사항을 viewCount 내림차순으로 15개 조회
    const findOptions: FindManyOptions<Article> = {
      where: {
        dateTime: MoreThanOrEqual(this.getDateWeeksAgo(2)),
      },
      order: {
        viewCount: "DESC",
      },
    };
    const articles = await this.findArticlePage(page, count, findOptions);
    return articles;
  }

  getDateWeeksAgo = (weeks: number) => {
    // DESCRIBE: dayjs의 객체값 사용 -> d는 UTC, timezone은 KST로 있었으니까? -> 날짜 변환 함수를 쓰면 -> 내부적으로 KST로 바꿔주지 않을까!
    // FIXME: 이게..최선?
    return dayjs(
      dayjs().subtract(2, "week").tz().format("YYYY-MM-DD"),
    ).toDate();
  };
}
