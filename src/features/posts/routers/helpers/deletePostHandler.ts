import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { db } from "../../../../db/in-memory.db";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { createErrorMessages } from "../../../../core/utils/error.utils";

export function deletePostHandler(
  req: RequestWithParams<URIParamsPostIdModel>,
  res: Response,
) {
  const id = String(req.params.id);
  const index = db.posts.findIndex((post) => post.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  db.posts.splice(index, 1);

  return res.sendStatus(HttpStatus.NoContent);
}
