import mongoose from "./db/mongoose.js";
import express from "express";
import bodyParser from "body-parser";
import user from "./routes/user.js";
import bounty from "./routes/bounty.js";
// import promotion from "./routes/promotion";
// import survey from "./routes/survey";

const port = process.env.port || 3000;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("connection established");

  next();
});

app.use("/api/v1/user", user);
app.use("/api/v1/bounty", bounty);
// app.use("api/v1/promotion", promotion);
// app.use("api/v1/survey", survey);

app.listen(port, () => {
  console.log(`Listening via port ${port}`);
});
