const express = require("express");
const { google } = require("googleapis");
const { getEmails, health } = require('../controllers/emailController');

const router = express.Router();

const {
  oauth2Client
} = require("../config/googleAuth");

router.get('/health', health);

router.get("/", async (req, res) => {
  try {
    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client
    });

    const oneDayAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    );

    const response =
      await gmail.users.messages.list({
        userId: "me",
        q: `after:${Math.floor(
          oneDayAgo.getTime() / 1000
        )}`,
        maxResults: 15
      });

    const messages =
      response.data.messages || [];

    const emailDetails =
      await Promise.all(
        messages.map(async (msg) => {
          const email =
            await gmail.users.messages.get({
              userId: "me",
              id: msg.id
            });

          const headers =
            email.data.payload.headers;

          const subject =
            headers.find(
              (h) => h.name === "Subject"
            )?.value || "No Subject";

          const from =
            headers.find(
              (h) => h.name === "From"
            )?.value || "Unknown";

          return {
            id: msg.id,
            from,
            subject,
            snippet:
              email.data.snippet || "",
            date:
              email.data.internalDate
          };
        })
      );

    res.json(emailDetails);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;