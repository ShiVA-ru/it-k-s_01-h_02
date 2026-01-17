import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { BlogInputModel } from "../../models/BlogInputModel";
import { ApiErrorResult } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
// import { createErrorMessages } from '../../../../core/utils/error.utils';
import { BlogViewModel } from "../../models/BlogViewModel";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";

export function createBlogHandler(
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogViewModel | ApiErrorResult>,
) {
  const createdEntity = blogsRepository.create(req.body);

  //Добавить валидацию и отправку ошибки
  // if (!createdEntity) {
  // return res.status(HttpStatus.BadRequest).json({ errorsMessages: [{ message: 'Invalid input', field: 'name' }] });
  // }

  res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
}
