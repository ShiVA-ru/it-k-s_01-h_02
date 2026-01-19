import { validationResult, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { validationErrorsDto, validationErrorType } from "../types/errors";

export const createErrorMessages = (
  errors: validationErrorType[],
): validationErrorsDto => {
  return { errorsMessages: errors };
};

const formatErrors = (error: ValidationError) => ({
  field: error.path,
  message: error.msg,
});

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Input validation result middleware");
  console.log(validationResult(req));
  const errors = validationResult(req)
    .formatWith(formatErrors)
    .array({ onlyFirstError: true });

  if (errors.length) {
    console.log(errors);
    return res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
  }

  next();
};
