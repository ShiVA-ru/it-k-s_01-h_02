import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostViewModel } from "../../models/PostViewModel";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";

export function getPostHandler(
  req: RequestWithParams<URIParamsPostIdModel>,
  res: Response<PostViewModel>,
) {
  const id = String(req.params.id);
  const findEntity = db.posts.find((post) => post.id === id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
}
