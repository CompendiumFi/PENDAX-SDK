import express from "express";
import okxRouter from "./routes/okx.routes.js";
import tvRouter from "./routes/tv.routes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/okx", okxRouter);
app.use("/okx/tv", tvRouter);
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
