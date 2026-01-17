import express, { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import { PostInputModel } from "../../../src/features/posts/models/PostInputModel";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";
import { RouterPath } from "../../../src/core/constants";
import { PostViewModel } from "../../../src/features/posts/models/PostViewModel";

export const postsTestManager = {
  initApp() {
    const app = express();
    setupApp(app);

    return app;
  },

  async createEntity(
    app: Express,
    data: PostInputModel,
    expectedStatusCode: HttpStatusType = HttpStatus.Created,
  ) {
    const response = await request(app)
      .post(RouterPath.posts)
      .send(data)
      .expect(expectedStatusCode);

    let createdEntity: PostViewModel | null = null;

    if (expectedStatusCode === HttpStatus.Created) {
      createdEntity = response.body;

      expect(createdEntity).toEqual({
        id: expect.any(String),
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
        blogName: expect.any(String),
      });
    }

    return { response, createdEntity };
  },
};
