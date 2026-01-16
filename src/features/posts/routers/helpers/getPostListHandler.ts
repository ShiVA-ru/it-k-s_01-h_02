import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostViewModel } from "../../models/PostViewModel";

export function getPostListHandler(
  req: Request,
  res: Response<PostViewModel[]>,
) {
  res.status(HttpStatus.Ok).json(db.posts.map(mapEntityToViewModel));
}
