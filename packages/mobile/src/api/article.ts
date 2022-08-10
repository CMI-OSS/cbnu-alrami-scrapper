import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";
import { Pagination } from "src/type/api";

export const fetchArticle = (articleId: number) => {
  return caxios.get<res.Article>(`/boards/articles/${articleId}`);
};

export const useArticle = (articleId: number) => {
  const response = useQuery<AxiosResponse<res.Article>, Error>(
    [ "article", articleId ],
    () => {
      return fetchArticle(articleId);
    },
  );
  return response;
};

export const fetchArticlesByBoard = (boardId: number, data: req.Pagination) => {
  return caxios.get<Pagination<res.ArticleByBoard>>(
    `/boards/${boardId}/articles`,
    {
      data,
    },
  );
};

export const useArticlesByBoard = (boardId: number, data: req.Pagination) => {
  const response = useQuery<AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>>(
    [ "articles", boardId ],
    () => {
      return fetchArticlesByBoard(boardId, data);
    },
    {
      select: (data) => {
        const contents = data.data.contents.map((notice) => {
          return {
            ...notice,
            breadcrumb: notice.board.parent
              ? `${notice.board.parent.name} > ${notice.board.name}`
              : notice.board.name,
          };
        });
        return { pagination: data.data.pagination, contents };
      },
    },
  );
  return response;
};

export const fetchNewArticles = (data: req.Pagination) => {
  return caxios.get<Pagination<res.ArticleByBoard>>(`/articles/subscribe`, {
    data,
  });
};

export const useNewArticles = (data: req.Pagination) => {
  const response = useQuery<AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>>(
    "newArticles",
    () => {
      return fetchNewArticles(data);
    },
    {
      select: (data) => {
        const contents = data.data.contents.map((notice) => {
          return {
            ...notice,
            breadcrumb: notice.board.parent
              ? `${notice.board.parent.name} > ${notice.board.name}`
              : notice.board.name,
          };
        });
        return { pagination: data.data.pagination, contents };
      },
    },
  );
  return response;
};

export const fetchPopularArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/popular`);
};

export const usePopularArticles = () => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>>("popularArticles", fetchPopularArticles,
    {
      select: (data) => {
        const contents = data?.data.map((article) => {
          return {
            ...article,
            breadcrumb: article.board.parent
              ? `${article.board.parent.name} > ${article.board.name}`
              : article.board.name,
          };
        });
        return { pagination: { isEnd: true }, contents };
      },
    });
  return response;
};

export const fetchBookmarkArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/bookmarks`);
};

export const useBookmarkArticles = () => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>>("bookmarkArticles", fetchBookmarkArticles,
    {
      select: (data) => {
        const contents = data?.data.map((article) => {
          return {
            ...article,
            breadcrumb: article.board.parent
              ? `${article.board.parent.name} > ${article.board.name}`
              : article.board.name,
          };
        });
        return { pagination: { isEnd: true }, contents };
      },
    });
  return response;
};
