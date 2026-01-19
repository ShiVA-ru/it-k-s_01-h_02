import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";

export function deleteBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response,
) {
  const id = req.params.id;

  const blog = blogsRepository.findOneById(id);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);

    return;
  }

  blogsRepository.deleteById(id);

  return res.sendStatus(HttpStatus.NoContent);
}
