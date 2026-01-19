import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";

export function getBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response<BlogViewModel>,
) {
  const id = String(req.params.id);
  const findEntity = blogsRepository.findOneById(id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
}
