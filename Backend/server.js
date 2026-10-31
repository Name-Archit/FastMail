const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

dotenv.config();

const app = express();
const aiRoutes =
  require('./routes/ai');
app.use('/ai', aiRoutes);
const replyRoutes =
  require('./routes/reply');

app.use(
  '/ai/reply',
  replyRoutes
);
app.use(cors());
app.use(express.json());

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
    console.log('🔄 New refresh token saved');
  }
});

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send'
    ],
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log('✅ Gmail Connected & Tokens Saved!');
    res.send('<h2>Gmail connected successfully! You can close this tab.</h2>');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.get('/emails', async (req, res) => {
  try {
    if (!oauth2Client.credentials) {
      return res.status(401).json({ error: "Please connect Gmail first" });
    }

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: `after:${Math.floor(oneDayAgo.getTime() / 1000)}`,
      maxResults: 15,
    });

    const messages = response.data.messages || [];
    const emailDetails = [];

    for (const msg of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });

      const headers = email.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';

      emailDetails.push({
        id: msg.id,
        from: from,
        subject: subject,
        snippet: email.data.snippet || '',
        internalDate: email.data.internalDate
      });
    }

    res.json(emailDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 FastMail Backend running on http://localhost:${PORT}`);
});

