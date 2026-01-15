// import { app } from "../blogs.api.spec";
import { app } from "../../../src/index";
import { RouterPath } from "../../../src/setup-app";
import { BlogInputModel } from "../../../src/features/blogs/models/BlogInputModel";
import request from "supertest";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";

export const blogsTestManager = {
  async createEntity(
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
