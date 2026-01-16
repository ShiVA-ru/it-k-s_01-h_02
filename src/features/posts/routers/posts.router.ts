import { Router } from "express";
import { createPostHandler } from "./helpers/createPostHandler";
import { getPostListHandler } from "./helpers/getPostListHandler";
import { getPostHandler } from "./helpers/getPostHandler";
import { updatePostHandler } from "./helpers/updatePostHandler";
import { deletePostHandler } from "./helpers/deletePostHandler";

export const PostsRouter = Router();

//Заменить тип Response PostViewModel на DTO

PostsRouter
  //CREATE
  .post("/", createPostHandler)
  //READ
  .get("/", getPostListHandler)

  .get("/:id", getPostHandler)
  //UPDATE
  .put("/:id", updatePostHandler)
  //DELETE
  .delete("/:id", deletePostHandler);
