const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const app = express();

app.use(hpp());
app.use(helmet());

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(morgan('dev'));
app.use(express.json());

const { MONGO_URI, PORT } = config;

let mongo_url = '';
let port = '';

if (process.env.NODE_ENV === 'production') {
    mongo_url = process.env.MONGO_URI;
    port = process.env.PORT;
} else {
    port = PORT;
    mongo_url = MONGO_URI;
}

mongoose
    .set('strictQuery', true)
    .connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('mongodb connecting success');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/user', require('./routes/api/user'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/user-tmp', require('./routes/api/user-tmp'));

const server = http.createServer(app);

const chatWebSocket = require('./middleware/socket');
chatWebSocket(server);
const rtcWebSocket = require('./middleware/rtcSocket');
rtcWebSocket(server);

server.listen(port, () => {
    console.log(`Server started on ${PORT} port`);
});
