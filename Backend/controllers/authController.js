const fs = require('fs');
const {
  oauth2Client,
  TOKEN_PATH
} = require('../config/googleAuth');

const login = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send'
    ]
  });

  res.redirect(authUrl);
};

const callback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } =
      await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    fs.writeFileSync(
      TOKEN_PATH,
      JSON.stringify(tokens)
    );

    console.log(
      '✅ Gmail Connected & Tokens Saved'
    );

    res.send(
      '<h2>Gmail Connected Successfully ✅</h2>'
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  login,
  callback
};