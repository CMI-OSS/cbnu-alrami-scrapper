import { useParams } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useArticleQuery } from "@hooks/api/article";
import dayjs from "dayjs";
import { isWebView } from "src/utils/webview";

import Footer from "./Footer";
import $ from "./style.module.scss";

function Detail() {
  const { articleId } = useParams();
  const {
    data: article,
    error,
    isLoading,
  } = useArticleQuery(Number(articleId)!);

  if (!article || error || isLoading) return <></>;
  return (
    <div className={$["notice-detail"]}>
      <FullPageModalTemplate
        left={isWebView ? <></> : <LeftArrow size={16} stroke="#AAAAAA" />}
        title={article.board.name}
      >
        <div className={$.children}>
          <div className={$.header}>
            <h1 className={$.title}>{article.title}</h1>
            <div className={$.detail}>
              <span>{dayjs(article.date).format("YY-MM-DD")}&nbsp;/&nbsp;</span>
              <span>조회수&nbsp;{article.hits}&nbsp;/&nbsp;</span>
              <span>스크랩&nbsp;{article.scraps}</span>
            </div>
          </div>
          <div
            className={$.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <Footer
          articleId={Number(articleId)}
          isBookmark={article?.isBookmark}
          isCouncil={String(article?.board.id)[0] === "3"}
        />
      </FullPageModalTemplate>
    </div>
  );
}

export default Detail;
