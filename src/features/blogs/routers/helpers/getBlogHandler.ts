import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";

export function getBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response<BlogViewModel>,
) {
  const id = String(req.params.id);
  const findEntity = db.blogs.find((blog) => blog.id === id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
}
