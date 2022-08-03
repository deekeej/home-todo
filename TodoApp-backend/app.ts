import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

//dotenv set up
dotenv.config();

// express setup
export const app: Express = express();
app.use(express.json());

app.use(cors());

// public folder
app.use(express.static(path.join(__dirname, "public")));

// server setup
const PORT: number =
  process.env.NODE_ENV === "test" ? 3300 : Number(process.env.PORT) || 3000;
app.listen(PORT, (): void => console.log(`server running on port: ${PORT}`));
