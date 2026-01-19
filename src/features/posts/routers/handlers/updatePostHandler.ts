import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { ApiErrorResult } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";

export function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsPostIdModel, PostInputModel>,
  res: Response<PostViewModel | ApiErrorResult>,
) {
  const id = String(req.params.id);
  const findEntity = postsRepository.findOneById(id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  postsRepository.updateById(id, req.body);
  //Добавить валидацию и отправку ошибки
  // if (!createdEntity) {
  // return res.status(HttpStatus.BadRequest).json({ errorsMessages: [{ message: 'Invalid input', field: 'title' }] });
  // }
  res.sendStatus(HttpStatus.NoContent);
}
