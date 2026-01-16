import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { BlogViewModel } from "../../models/BlogViewModel";

export function getBlogListHandler(
  req: Request,
  res: Response<BlogViewModel[]>,
) {
  res.status(HttpStatus.Ok).json(db.blogs.map(mapEntityToViewModel));
}
