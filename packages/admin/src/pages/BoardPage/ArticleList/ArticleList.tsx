import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";

import PaginationView from "../../../components/Pagination/Pagination.view";
import $ from "./ArticleList.module.scss";
import ArticleListView from "./ArticleList.view";

export default function ArticleList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;
  const navigate = useNavigate();
  const { boardId } = useParams();

  const pageSize = 7;

  const { data: articlePageOutput, isLoading } = useQuery(
    [ "articles", boardId, page, pageSize ],
    () =>
      BoardApiService.boardControllerFindArticlePage({
        id: Number(boardId),
        page,
        count: pageSize,
      }),
  );

  if (isLoading || !articlePageOutput) return null;

  const handleClickArticle = (articleId: number) => {
    navigate(`/board/articles/${articleId}`);
  };

  const handleClickPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className={$["article-list"]}>
      <div>총학생회 &gt; 공지사항</div>
      <ArticleListView
        articles={articlePageOutput?.articles}
        onClickArticle={handleClickArticle}
      />
      <PaginationView
        current={page}
        total={articlePageOutput.pagination.totalItemCount}
        onChange={handleClickPage}
        pageSize={pageSize}
      />
    </div>
  );
}
