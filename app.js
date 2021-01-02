import mongoose from "./db/mongoose";
import express from "express";
import bodyParser from "body-parser";
import bounty from "./routes/bounty";
import promotion from "./routes/promotion";
import survey from "./routes/survey";
import user from "./routes/user";

const port = process.env.port || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/bounty", bounty);
app.use("/promotion", promotion);
app.use("/survey", survey);
app.use("/user", user);

app.listen(port, () => {
  console.log(`Listening via port ${port}`);
});
