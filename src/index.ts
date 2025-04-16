import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./routes/auth"
import protectedRoutes from "./routes/protectedRoutes"
import AppError from "./errors/AppError";
import { errorHandler } from "./middlewares/errorHandler";
import { authMiddleware } from "./middlewares/authMiddleware";
import multer from "multer";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT || 2330;

const upload = multer({ dest: "uploads/" })

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Patient Management System");
});

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads/")))

// app.use("/auth", authRoutes)

app.use("/userApp", auth)
app.use("/app", authMiddleware, protectedRoutes)

app.use((req: Request, res: Response, next: NextFunction): any => {
  throw new AppError(`Route ${req.path} not found`, 404)
})

app.use(errorHandler)

// start the Express server
app.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
