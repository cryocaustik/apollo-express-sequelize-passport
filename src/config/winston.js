const winston = require('winston');
const expressWinston = require('express-winston');
require("winston-daily-rotate-file");
const path = require("path");

const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(process.env.LOG_DIR, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const authHeaderFilter = (req, propName) => {
  if (propName === "headers") {
    if (req.headers.authorization.length > 7)
      req.headers.authorization = "jwt-redacted"
    return req.headers
  } else {
    return req[propName]
  }
}

module.exports = {
  winstonMiddleware: expressWinston.logger({
    transports: [
      fileTransport
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    ignoreRoute: function (req, res) {
      return false;
    },
    requestFilter: authHeaderFilter
  }),
  winston: winston.createLogger({
    transports: [fileTransport]
  })
}