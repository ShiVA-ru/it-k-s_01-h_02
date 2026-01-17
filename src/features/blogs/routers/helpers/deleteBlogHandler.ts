import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { createErrorMessages } from "../../../../core/utils/error.utils";
import { blogsRepository } from "../../repositories/blogs.repository";

export function deleteBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response,
) {
  const id = String(req.params.id);

  const isDeleted = blogsRepository.deleteById(id);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  return res.sendStatus(HttpStatus.NoContent);
}
