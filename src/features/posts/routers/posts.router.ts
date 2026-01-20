import { Router } from "express";
import { createPostHandler } from "./handlers/createPostHandler";
import { getPostListHandler } from "./handlers/getPostListHandler";
import { getPostHandler } from "./handlers/getPostHandler";
import { updatePostHandler } from "./handlers/updatePostHandler";
import { deletePostHandler } from "./handlers/deletePostHandler";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { postInputDtoValidation } from "../validation/posts.input-dto.validation-middleware";

export const PostsRouter = Router();

//Заменить тип Response PostViewModel на DTO

PostsRouter
  //CREATE
  .post(
    "/",
    postInputDtoValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )
  //READ
  .get("/", getPostListHandler)

  .get("/:id", idValidation, getPostHandler)
  //UPDATE
  .put(
    "/:id",
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )
  //DELETE
  .delete("/:id", idValidation, deletePostHandler);
