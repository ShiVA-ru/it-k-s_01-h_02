import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostViewModel } from "../../models/PostViewModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { ApiErrorResult } from "../../../../core/types/errors";
import { postsRepository } from "../../repositories/posts.repository";

export function getPostHandler(
  req: RequestWithParams<URIParamsPostIdModel>,
  res: Response<PostViewModel | ApiErrorResult>,
) {
  const id = String(req.params.id);
  const findEntity = postsRepository.findOneById(id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const blogEntity = blogsRepository.findOneById(findEntity.blogId);

  if (!blogEntity) {
    res.status(HttpStatus.NotFound).json({
      errorsMessages: [{ message: "Blog not found", field: "blogId" }],
    });
    return;
  }

  return res
    .status(HttpStatus.Ok)
    .json(mapEntityToViewModel(findEntity, blogEntity.name));
}
