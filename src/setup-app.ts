import express, { Express } from "express";
import { testingRouter } from "./testing/testing.router";
import { blogsRouter } from "./features/blogs/routers/blogs.router";
import { RouterPath } from "./core/constants";
// import { postsRouter } from "./features/posts/routers/posts.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  // основной роут
  app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
  });

  app.use(RouterPath.blogs, blogsRouter);
  // app.use(RouterPath.posts, postsRouter);
  app.use(RouterPath.testing, testingRouter);

  return app;
};
