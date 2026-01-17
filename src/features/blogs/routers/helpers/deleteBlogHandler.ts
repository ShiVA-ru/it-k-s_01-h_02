import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { createErrorMessages } from "../../../../core/utils/error.utils";
import { blogsRepository } from "../../repositories/blogs.repository";

export function deleteBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response,
) {
  const id = String(req.params.id);

  const blog = blogsRepository.findOneById(id);

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  blogsRepository.deleteById(id);

  return res.sendStatus(HttpStatus.NoContent);
}
