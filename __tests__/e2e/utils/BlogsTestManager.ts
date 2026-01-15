import { RouterPath } from "../../../src/setup-app";
import { app } from "../../../src/index";
import { CreateVideoModel } from "../../../src/videos/models/CreateVideoModel";
import request from "supertest";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";

export const videosTestManager = {
  async createEntity(
    data: CreateVideoModel,
    expectedStatusCode: HttpStatusType = HttpStatus.Created,
  ) {
    const response = await request(app)
      .post(RouterPath.videos)
      .send(data)
      .expect(expectedStatusCode);

    let createdEntity;

    if (expectedStatusCode === HttpStatus.Created) {
      createdEntity = response.body;

      expect(createdEntity).toEqual({
        id: expect.any(Number),
        title: data.title,
        author: data.author,
        availableResolutions: data.availableResolutions,
        canBeDownloaded: expect.any(Boolean),
        minAgeRestriction: null,
        createdAt: expect.any(String),
        publicationDate: expect.any(String),
      });
    }

    return { response, createdEntity };
  },
};
