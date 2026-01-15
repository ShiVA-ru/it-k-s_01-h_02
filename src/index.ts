import express from "express";
import { setupApp } from "./setup-app";

// создание приложения
export const app = express();
setupApp(app);

// порт приложения
const PORT = process.env.PORT || 5001;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;
