import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { ApiErrorResult } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { postsRepository } from "../../repositories/posts.repository";

export function createPostHandler(
  req: RequestWithBody<PostInputModel>,
  res: Response<PostViewModel | ApiErrorResult>,
) {
  const blogEntity = blogsRepository.findOneById(req.body.blogId);

  if (!blogEntity) {
    res.status(HttpStatus.NotFound).json({
      errorsMessages: [{ message: "Blog not found", field: "blogId" }],
    });
    return;
  }

  const createdEntity = postsRepository.create(req.body);

  //Добавить валидацию и отправку ошибки
  // if (!createdEntity) {
  // return res.status(HttpStatus.BadRequest).json({ errorsMessages: [{ message: 'Invalid input', field: 'title' }] });
  // }

  res
    .status(HttpStatus.Created)
    .json(mapEntityToViewModel(createdEntity, blogEntity.name));
}
