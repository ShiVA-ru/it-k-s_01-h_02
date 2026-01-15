import { ValidationError } from "../../core/types/validation-error";
import { CreateVideoModel } from "../models/CreateVideoModel";
import { VideoResolutions } from "../models/video-resolutions";

export const createVideoValidate = (
  data: CreateVideoModel,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length < 1 ||
    data.title.trim().length > 40
  ) {
    errors.push({ field: "title", message: "Invalid title" });
  }

  if (
    !data.author ||
    typeof data.author !== "string" ||
    data.author.trim().length < 1 ||
    data.author.trim().length > 20
  ) {
    errors.push({ field: "author", message: "Invalid author" });
  }

  if (!Array.isArray(data.availableResolutions)) {
    errors.push({
      field: "availableResolutions",
      message: "availableResolutions must be array",
    });
  } else if (data.availableResolutions.length) {
    const existingResolutions = Object.values(VideoResolutions);

    if (
      data.availableResolutions.length > existingResolutions.length ||
      data.availableResolutions.length < 1
    ) {
      errors.push({
        field: "availableResolutions",
        message: "Invalid availableResolutions length",
      });
    }

    for (const resolution of data.availableResolutions) {
      if (!existingResolutions.includes(resolution)) {
        errors.push({
          field: "availableResolutions",
          message: "Invalid availableResolution:" + resolution,
        });
        break;
      }
    }
  }

  return errors;
};
