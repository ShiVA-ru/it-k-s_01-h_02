import { Router } from "express";
import { createPostHandler } from "./handlers/createPostHandler";
import { getPostListHandler } from "./handlers/getPostListHandler";
import { getPostHandler } from "./handlers/getPostHandler";
import { updatePostHandler } from "./handlers/updatePostHandler";
import { deletePostHandler } from "./handlers/deletePostHandler";

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
