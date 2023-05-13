const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require('body-parser');

const app = express();

app.use(hpp());
app.use(helmet());

// application/x-www-form-urlencorded 이렇게 된 데이터를 가져와서 분석
app.use(bodyParser.urlencoded({extended: true})); 
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

app.use("/api/user", require("./routes/api/user"));

const server = http.createServer(app);

const webSocket = require("./middleware/socket");
const { User } = require("./models/user");
webSocket(server);

app.post('/register', async (req, res) => {
  `회원가입 시 필요한 정보들을 클라이언트에서 가져와 db에 삽입 feat.bodyParser`
  const user = new User(req.body); // instance 생성
  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err});
  //   return res.status(200).json({
  //     success: true
  //   })
  // })

  await user.save().then(() => {
    res.status(200).json({
      success: true
    })
  }).catch((err) => {
    res.json({ success: false, err })
  })


})

// app.get("/", (req, res) => {
//   res.send("Hello Reviews!!!!");
// });
server.listen(port, () => {
  console.log(`Server started on ${PORT} port`);
});
