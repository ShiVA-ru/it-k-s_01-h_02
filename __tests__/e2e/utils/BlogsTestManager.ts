import express, { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import { BlogInputModel } from "../../../src/features/blogs/models/BlogInputModel";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";
import { RouterPath } from "../../../src/core/constants";

export const blogsTestManager = {
  initApp() {
    const app = express();
    setupApp(app);

    return app;
  },
  async createEntity(
    app: Express,
    data: BlogInputModel,
    expectedStatusCode: HttpStatusType = HttpStatus.Created,
  ) {
    const response = await request(app)
      .post(RouterPath.blogs)
      .send(data)
      .expect(expectedStatusCode);

    let createdEntity;

    if (expectedStatusCode === HttpStatus.Created) {
      createdEntity = response.body;

      expect(createdEntity).toEqual({
        id: expect.any(String),
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
      });
    }

    return { response, createdEntity };
  },
};
