import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import type { imgType } from "../types";
import { AuthorityBoard } from "./types";

// header.set("Content-type", "multipart/form-data");

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery,
  tagTypes: [ "ImgUpload", "writeArticle" ],
  endpoints: (build) => {
    return {
      imgUpload: build.mutation<imgType[], FormData>({
        query(data) {
          return {
            url: "upload/images",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: [ "ImgUpload" ],
      }),
      writeArticle: build.mutation<
        number,
        {
          title: string;
          boardId: number;
          content: string;
          images: Array<string>;
        }
      >({
        query(data) {
          return {
            url: `boards/${data.boardId}/article`,
            method: "POST",
            body: {
              title: data.title,
              content: data.content,
              images: data.images,
              date: new Date(),
            },
          };
        },
        invalidatesTags: [ "writeArticle" ],
      }),
      updateArticle: build.mutation<
        number,
        {
          articleId: number;
          title: string;
          content: string;
          images: Array<string>;
        }
      >({
        query(data) {
          return {
            url: `/articles/${data.articleId}`,
            method: "PUT",
            body: {
              title: data.title,
              content: data.content,
              images: data.images,
            },
          };
        },
        invalidatesTags: [ "writeArticle" ],
      }),
      getArticle: build.query<
        {
          title: string;
          boardId: number;
          content: string;
          images: {
            id: number;
            url: string;
          }[];
          hits: number;
          scraps: number;
        },
        {
          articleId: number;
        }
      >({
        query(data) {
          return {
            url: `boards/articles/${data.articleId}`,
            method: "get",
          };
        },
      }),
      getAuthorityBoards: build.query<AuthorityBoard[], void>({
        query() {
          return {
            url: `authority/boards`,
            method: "get",
          };
        },
      }),
    };
  },
});

export const {
  useImgUploadMutation,
  useWriteArticleMutation,
  useUpdateArticleMutation,
  useGetArticleQuery,
  useGetAuthorityBoardsQuery,
} = boardWriteApi;
