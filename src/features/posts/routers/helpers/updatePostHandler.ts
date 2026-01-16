import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { ApiErrorResult } from "../../../../core/types/errors";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { createErrorMessages } from "../../../../core/utils/error.utils";
import { PostDbModel } from "../../models/PostDbModel";

export function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsPostIdModel, PostInputModel>,
  res: Response<PostViewModel | ApiErrorResult>,
) {
  const id = String(req.params.id);
  const index = db.posts.findIndex((post) => post.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  const entity = db.posts[index];

  const updatedEntity: PostDbModel = {
    ...entity,
    ...req.body,
    id: entity.id,
  };

  db.posts[index] = updatedEntity;

  res.sendStatus(HttpStatus.NoContent);
}
