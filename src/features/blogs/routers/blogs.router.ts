import { Router } from "express";
import { createBlogHandler } from "./helpers/createBlogHandler";
import { getBlogListHandler } from "./helpers/getBlogListHandler";
import { getBlogHandler } from "./helpers/getBlogHandler";
import { updatePostHandler } from "./helpers/updatePostHandler";
import { deleteBlogHandler } from "./helpers/deleteBlogHandler";

export const blogsRouter = Router();

//Заменить тип Response BlogViewModel на DTO

blogsRouter
  .post("/", createBlogHandler)

  .get("/", getBlogListHandler)

  .get("/:id", getBlogHandler)

  .put("/:id", updatePostHandler)

  .delete("/:id", deleteBlogHandler);
