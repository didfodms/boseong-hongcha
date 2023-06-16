var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const registerRouter = require("./routes/register");

require("dotenv").config();

var app = express();

// session middleware
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const threeHours = 1000 * 60 * 60 * 3;

app.use(cookieParser());

app.use(
  session({
    HttpOnly: true,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // maxAge: threeHours,
      maxAge: null,
      httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
      Secure: true,
    },
    store: new fileStore(), // sessions 폴더에 session record 저장
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);

// example.html을 라우트로 서빙
app.get("/example", (req, res) => {
  res.sendFile(path.join(__dirname, "example.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
