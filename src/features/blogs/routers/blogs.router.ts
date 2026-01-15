import { Router, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { db, VideoType } from "../db/in-memory.db";
import { VideoViewModel } from "./models/VideoViewModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../core/types/request-types";
import { URIParamsVideoIdModel } from "./models/URIParamsVideoModel";
import { CreateVideoModel } from "./models/CreateVideoModel";
import { UpdateVideoModel } from "./models/UpdateVideoModel";
import { updateVideoValidate } from "./validation/update-video.validator";
import { createVideoValidate } from "./validation/create-video.validator";
import { createErrorMessages } from "../core/utils/error.utils";
import { ValidationError } from "../core/types/validation-error";

export const videosRouter = Router();

const mapEntityToViewModel = (dbEntity: VideoType): VideoViewModel => ({
  id: dbEntity.id,
  title: dbEntity.title,
  author: dbEntity.author,
  canBeDownloaded: dbEntity.canBeDownloaded,
  minAgeRestriction: dbEntity.minAgeRestriction,
  createdAt: dbEntity.createdAt,
  publicationDate: dbEntity.publicationDate,
  availableResolutions: dbEntity.availableResolutions,
});

//CREATE
videosRouter.post(
  "/",
  (
    req: RequestWithBody<CreateVideoModel>,
    res: Response<VideoViewModel | { errorsMessages: ValidationError[] }>,
  ) => {
    const errors = createVideoValidate(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const DAY_IN_MS = 24 * 60 * 60 * 1000;
    const createdAt = new Date();
    const publicationDate = new Date(createdAt.getTime() + DAY_IN_MS);

    const createdEntity: VideoViewModel = {
      id: +new Date(),
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt.toISOString(),
      publicationDate: publicationDate.toISOString(),
      availableResolutions: req.body.availableResolutions,
    };
    db.videos.push(createdEntity);

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  },
);

// READ
videosRouter.get("/", (req, res: Response<VideoViewModel[]>) => {
  res.status(HttpStatus.Ok).json(db.videos.map(mapEntityToViewModel));
});

videosRouter.get(
  "/:id",
  (
    req: RequestWithParams<URIParamsVideoIdModel>,
    res: Response<VideoViewModel>,
  ) => {
    const id = parseInt(String(req.params.id));
    const findEntity = db.videos.find((video) => video.id === id);

    if (!findEntity) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
  },
);

//UPDATE
videosRouter.put(
  "/:id",
  (
    req: RequestWithParamsAndBody<URIParamsVideoIdModel, UpdateVideoModel>,
    res: Response<VideoViewModel | { errorsMessages: ValidationError[] }>,
  ) => {
    const id = parseInt(String(req.params.id));
    const index = db.videos.findIndex((video) => video.id === id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Video not found" }]),
        );
      return;
    }

    const errors = updateVideoValidate(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const video = db.videos[index];
    const updatedVideo = {
      ...video,
      ...req.body,
      id: video.id,
    };

    db.videos[index] = updatedVideo;

    res.sendStatus(HttpStatus.NoContent);
  },
);

//DELETE
videosRouter.delete(
  "/:id",
  (req: RequestWithParams<URIParamsVideoIdModel>, res: Response) => {
    const id = parseInt(String(req.params.id));
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Video not found" }]),
        );
      return;
    }

    db.videos.splice(index, 1);

    return res.sendStatus(HttpStatus.NoContent);
  },
);
