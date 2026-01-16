import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { BlogInputModel } from "../../models/BlogInputModel";
import { ApiErrorResult } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
// import { createErrorMessages } from '../../../../core/utils/error.utils';
import { BlogViewModel } from "../../models/BlogViewModel";
import { db } from "../../../../db/in-memory.db";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { BlogDbModel } from "../../models/BlogDbModel";

export function createBlogHandler(
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogViewModel | ApiErrorResult>,
) {
  const createdEntity: BlogDbModel = {
    id: new Date().toString(),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };
  db.blogs.push(createdEntity);

  res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
}
