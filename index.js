import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import agendaRouter from "./routes/agenda.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/agenda", agendaRouter);
app.use("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running `)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set("useFindAndModify", false);
