import { Router } from "express";
import { createBlogHandler } from "./handlers/createBlogHandler";
import { getBlogListHandler } from "./handlers/getBlogListHandler";
import { getBlogHandler } from "./handlers/getBlogHandler";
import { updateBlogHandler } from "./handlers/updateBlogHandler";
import { deleteBlogHandler } from "./handlers/deleteBlogHandler";

export const blogsRouter = Router();

//Заменить тип Response BlogViewModel на DTO

blogsRouter
  .post("/", createBlogHandler)

  .get("/", getBlogListHandler)

  .get("/:id", getBlogHandler)

  .put("/:id", updateBlogHandler)

  .delete("/:id", deleteBlogHandler);
