const express = require("express");
const fs = require("fs");

const router = express.Router();

const {
  oauth2Client,
  TOKEN_PATH
} = require("../config/googleAuth");

router.get("/", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send"
    ]
  });

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } =
      await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    fs.writeFileSync(
      TOKEN_PATH,
      JSON.stringify(tokens)
    );

    res.send(
      "<h2>Gmail Connected Successfully ✅</h2>"
    );
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;