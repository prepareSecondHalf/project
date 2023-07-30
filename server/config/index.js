const dotenv = require("dotenv");

dotenv.config();

console.log("DB_HOST:", process.env.MONGO_URI);
console.log("DB_HOST:", process.env.PORT);

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  TRANSPORTER_EMAIL: process.env.TRANSPORTER_EMAIL,
  TRANSPORTER_EMAIL_PASSWORD: process.env.TRANSPORTER_EMAIL_PASSWORD,
};
