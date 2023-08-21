import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "../routes/userRoutes";
import ticketRoutes from "../routes/ticketRoutes";

const createExpressApp = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use("/accounts", userRoutes);
  app.use("/content", ticketRoutes);

  // Error handling
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  );

  return app;
};

export default createExpressApp;
