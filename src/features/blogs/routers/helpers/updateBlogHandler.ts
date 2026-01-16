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

export function updateBlogHandler(
  req: RequestWithParamsAndBody<URIParamsBlogIdModel, BlogInputModel>,
  res: Response<BlogViewModel | ApiErrorResult>,
) {
  const id = String(req.params.id);
  const index = db.blogs.findIndex((blog) => blog.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  const entity = db.blogs[index];

  const updatedEntity: BlogDbModel = {
    ...entity,
    ...req.body,
    id: entity.id,
  };

  db.blogs[index] = updatedEntity;

  res.sendStatus(HttpStatus.NoContent);
}
