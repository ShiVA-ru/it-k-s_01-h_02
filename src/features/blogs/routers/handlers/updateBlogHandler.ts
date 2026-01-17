import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { BlogInputModel } from "../../models/BlogInputModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { ApiErrorResult } from "../../../../core/types/errors";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { createErrorMessages } from "../../../../core/utils/error.utils";
import { BlogDbModel } from "../../models/BlogDbModel";
import { blogsRepository } from "../../repositories/blogs.repository";

export function updateBlogHandler(
  req: RequestWithParamsAndBody<URIParamsBlogIdModel, BlogInputModel>,
  res: Response<BlogViewModel | ApiErrorResult>,
) {
  const id = String(req.params.id);
  const isUpdated = blogsRepository.updateById(id, req.body);

  if (!isUpdated) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  //Добавить валидацию и отправку ошибки
  // if (!createdEntity) {
  // return res.status(HttpStatus.BadRequest).json({ errorsMessages: [{ message: 'Invalid input', field: 'title' }] });
  // }

  res.sendStatus(HttpStatus.NoContent);
}
