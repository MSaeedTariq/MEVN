import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import DbConnection from "./database.js";
import AuthRoute from "./routes/auth.js";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));

// Auth Route
app.use(AuthRoute);

await DbConnection();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Running On Port : ${port}`);
});
