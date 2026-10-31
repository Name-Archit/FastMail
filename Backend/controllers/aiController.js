const {
  getRecentEmails
} = require('../services/gmailService');

const {
  summarizeEmail
} = require('../services/aiService');

const getSummary = async (req, res) => {

  try {

    const emails =
      await getRecentEmails();

    if (!emails || emails.length === 0) {

      return res.json({
        totalEmails: 0,
        message:
          "No emails received in the last 24 hours."
      });

    }

    const cards = await Promise.all(

      emails.map(async (email) => {

        const summary =
          await summarizeEmail(email);

        return {

          id: email.id,

          sender: email.from,

          subject:
            email.subject ||
            "No Subject",

          attachments: {
            count:
              email.attachmentCount,

            types:
              email.attachmentTypes
          },

          summary,

          gmailUrl:
            email.gmailUrl

        };

      })

    );

    return res.json({
      totalEmails: emails.length,
      emails: cards
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {
  getSummary
};