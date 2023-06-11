const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", function (req, res, next) {
  if (req.session?.is_logined) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("로그아웃 불가능");
      } else {
        console.log("로그아웃 성공");
        res.redirect("/login");
      }
    });
  } else {
    console.log("로그아웃 실패");
    res.end();
  }
});

module.exports = router;
