const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("login", {
    session: req.session,
  });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const nickname = body.loginNickname;
  const password = body.loginPassword;

  const checkNicknameSQL = `SELECT * FROM user_table
                            WHERE UserNAME = '${nickname}' AND UserPW = '${password}'`;

  let user;
  const login_flag = await new Promise((resolve, reject) => {
    db.query(checkNicknameSQL, (err, res) => {
      if (err) {
        reject(err);
      }

      // login failed!
      if (!res[0]) {
        resolve(false);
      } // login success!
      else {
        user = res[0];
        resolve(true);
      }
    });
  });

  console.log("login_flag", login_flag);

  if (login_flag) {
    req.session.is_logined = true;
    req.session.UserID = user.UserID;
    req.session.UserEmail = user.UserEmail;
    req.session.Newquestion = user.Newquestion;
    req.session.Permission = user.Permission;

    req.session.save((err) => {
      if (err) throw err;
      res.json({
        result: "success",
      });
    });
  } else {
    res.json({
      result: "error",
    });
  }
});

module.exports = router;
