import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { ApiErrorResult } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
// import { createErrorMessages } from '../../../../core/utils/error.utils';
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { PostDbModel } from "../../models/PostDbModel";

export function createPostHandler(
  req: RequestWithBody<PostInputModel>,
  res: Response<PostViewModel | ApiErrorResult>,
) {
  const blogEntity = db.blogs.find((b) => b.id === req.body.blogId);

  if (!blogEntity) {
    return res.status(HttpStatus.NotFound).json({
      errorsMessages: [{ message: "Blog not found", field: "blogId" }],
    });
  }

  const createdEntity: PostDbModel = {
    id: new Date().toString(),
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: blogEntity.name,
  };

  db.posts.push(createdEntity);

  res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
}
