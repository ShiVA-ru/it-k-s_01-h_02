import express, { Express } from "express";
import { videosRouter } from "./videos/videos.router";
import { testingRouter } from "./testing/testing.router";

export const RouterPath = {
  videos: "/videos",
  testing: "/testing",
};

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
  });

  app.use(RouterPath.videos, videosRouter);
  app.use(RouterPath.testing, testingRouter);

  return app;
};
