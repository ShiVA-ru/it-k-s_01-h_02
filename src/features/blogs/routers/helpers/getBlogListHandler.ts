import { Request, Response } from "express";
import { BlogViewModel } from "../../models/BlogViewModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "./mapEntityToViewModel";

export function getBlogListHandler(
  req: Request,
  res: Response<BlogViewModel[]>,
) {
  res.status(HttpStatus.Ok).json(db.blogs.map(mapEntityToViewModel));
}
