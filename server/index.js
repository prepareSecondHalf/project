const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const { auth } = require("./middleware/auth");
const app = express();

app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// application/x-www-form-urlencorded 이렇게 된 데이터를 가져와서 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터 받아와 분석
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

const { MONGO_URI, PORT } = config;

let mongo_url = "";
let port = "";

if (process.env.NODE_ENV === "production") {
  mongo_url = process.env.MONGO_URI;
  port = process.env.PORT;
} else {
  port = PORT;
  mongo_url = MONGO_URI;
}

mongoose
  .set("strictQuery", true)
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connecting success");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/api/user", require("./routes/api/user"));

const server = http.createServer(app);

const webSocket = require("./middleware/socket");
const { User } = require("./models/user");
const userRouter = require("./api/user.js");

app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello Reviews!!!!");
});
webSocket(server);

server.listen(port, () => {
  console.log(`Server started on ${PORT} port`);
});
