import request from "supertest";
import { RouterPath } from "../../src/setup-app";
import { app } from "../../src/index";
import { HttpStatus } from "../../src/core/types/http-statuses";
import { VideoViewModel } from "../../src/videos/models/VideoViewModel";
import { CreateVideoModel } from "../../src/videos/models/CreateVideoModel";
import { videosTestManager } from "./utils/videosTestManager";
import { UpdateVideoModel } from "../../src/videos/models/UpdateVideoModel";
import { VideoResolutions } from "../../src/videos/models/video-resolutions";

describe("tests for /videos", () => {
  beforeAll(async () => {
    await request(app).delete(`${RouterPath.testing}/all-data`);
  });

  it("should return 200 and empty array", async () => {
    await request(app).get(RouterPath.videos).expect(200, []);
  });

  it("should return 404 if not existing entity", async () => {
    await request(app).get(`${RouterPath.videos}/939`).expect(404);
  });

  it("shouldn't create entity with incorrect data", async () => {
    const data: CreateVideoModel = {
      title: "",
      author: "New Author",
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await videosTestManager.createEntity(data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.videos).expect(HttpStatus.Ok, []);
  });

  let createdEntity1: VideoViewModel;
  let createdEntity2: VideoViewModel;

  it("should create entity with correct data", async () => {
    const data: CreateVideoModel = {
      title: "New Video",
      author: "New Author",
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    const { createdEntity } = await videosTestManager.createEntity(data);

    createdEntity1 = createdEntity;

    await request(app).get(RouterPath.videos).expect(200, [createdEntity1]);
  });

  it("should create another entity with correct data", async () => {
    const data: CreateVideoModel = {
      title: "New Video",
      author: "New Author",
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    const { createdEntity } = await videosTestManager.createEntity(data);

    createdEntity2 = createdEntity;

    await request(app)
      .get(RouterPath.videos)
      .expect(HttpStatus.Ok, [createdEntity1, createdEntity2]);
  });

  it("shouldn't update entity with incorrect title length less than 1", async () => {
    const data: UpdateVideoModel = {
      title: "",
      author: "New Author",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect title length more than 40", async () => {
    const data: UpdateVideoModel = {
      title: "videovideovideovideovideovideovideovideovideovideo",
      author: "New Author",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect author length less than 1", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect author length more than 20", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "AuthorAuthorAuthorAuthor",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect minAgeRestriction less than 1", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "Author",
      canBeDownloaded: true,
      minAgeRestriction: 0,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect minAgeRestriction more than 18", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "Author",
      canBeDownloaded: true,
      minAgeRestriction: 20,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect publicationDate", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "Author",
      canBeDownloaded: true,
      minAgeRestriction: 15,
      publicationDate: "dfsdf",
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect availableResolutions length less than 1", async () => {
    const data: UpdateVideoModel = {
      title: "video",
      author: "Author",
      canBeDownloaded: true,
      minAgeRestriction: 15,
      publicationDate: new Date().toISOString(),
      availableResolutions: [],
    };

    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity that not exist", async () => {
    const data: UpdateVideoModel = {
      title: "Title",
      author: "New Author",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };
    await request(app)
      .put(`${RouterPath.videos}/123`)
      .send(data)
      .expect(HttpStatus.NotFound);
  });

  it("should update entity with correct input data", async () => {
    const data: UpdateVideoModel = {
      title: "Title",
      author: "New Author",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      publicationDate: new Date().toISOString(),
      availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
    };
    await request(app)
      .put(`${RouterPath.videos}/${createdEntity1.id}`)
      .send(data)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, { ...createdEntity1, ...data });

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity2.id}`)
      .expect(HttpStatus.Ok, createdEntity2);
  });

  it("should delete entity", async () => {
    await request(app)
      .delete(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity1.id}`)
      .expect(HttpStatus.NotFound);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity2.id}`)
      .expect(HttpStatus.Ok, createdEntity2);

    await request(app)
      .delete(`${RouterPath.videos}/${createdEntity2.id}`)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${RouterPath.videos}/${createdEntity2.id}`)
      .expect(HttpStatus.NotFound);

    await request(app).get(RouterPath.videos).expect(HttpStatus.Ok, []);
  });
});
