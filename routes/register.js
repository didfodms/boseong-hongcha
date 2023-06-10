const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("register", {
    session: req.session,
  });
});

// 이메일 중복 체크
router.post("/email-duplicate-check", async function (req, res, next) {
  const body = req.body;
  const email = body.email;

  const emailDuplicateCheckSQL = `SELECT * FROM user_table WHERE UserNAME = '${email}'`;

  const result = await new Promise((resolve, reject) => {
    db.query(emailDuplicateCheckSQL, (err, res) => {
      if (err) {
        // reject(err);
        throw err;
      }
      resolve(res);
    });
  });

  if (result.length === 0) {
    res.json({
      result: "success",
    });
  } else {
    res.json({
      result: "error",
    });
  }
});

router.post("/", async function (req, res, next) {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  const signupSQL = `INSERT INTO user_table(UserNAME, UserPW) VALUES('${email}', '${password}')`;

  const signup_flag = await new Promise((resolve, reject) => {
    db.query(signupSQL, (err, res) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });

  if (signup_flag) {
    res.json({
      result: "success",
    });
  } else {
    res.json({
      result: "error",
    });
  }
});

module.exports = router;
