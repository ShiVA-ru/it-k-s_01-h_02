import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";

export function getBlogListHandler(
  req: Request,
  res: Response<BlogViewModel[]>,
) {
  const findBlogs = blogsRepository.findAll();
  res.status(HttpStatus.Ok).json(findBlogs.map(mapEntityToViewModel));
}
