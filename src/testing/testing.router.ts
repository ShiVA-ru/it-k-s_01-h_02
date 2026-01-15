import { Router, Request, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { db } from "../db/in-memory.db";
// import { createErrorMessages } from "../core/utils/error.utils";
// import { ValidationError } from "../../drivers/types/validation-error";

export const testingRouter = Router();

testingRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send("testing url");
});

testingRouter.delete("/all-data", (req, res) => {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});
