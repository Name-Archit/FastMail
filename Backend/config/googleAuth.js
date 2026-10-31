const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const TOKEN_PATH = './tokens.json';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

if (fs.existsSync(TOKEN_PATH)) {
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oauth2Client.setCredentials(tokens);
  console.log('✅ Loaded saved Gmail tokens');
}

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log('🔄 Refresh token saved');
  }
});

module.exports = {
  oauth2Client,
  TOKEN_PATH
};