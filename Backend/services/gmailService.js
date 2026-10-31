const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');

function parseEmailDetails(email, msg, from, subject) {

  const parts = email.data.payload?.parts || [];

  let attachmentCount = 0;
  let attachmentTypes = [];

  parts.forEach(part => {
    if (part.filename) {

      attachmentCount++;

      const mime = part.mimeType || '';

      if (mime.includes('image')) {
        attachmentTypes.push('Image');
      }
      else if (
        mime.includes('pdf') ||
        mime.includes('document') ||
        mime.includes('sheet') ||
        mime.includes('word')
      ) {
        attachmentTypes.push('Document');
      }
      else {
        attachmentTypes.push('File');
      }
    }
  });

  const body = extractBody(email.data.payload);

  return {
    id: msg.id,
    from,
    subject,
    snippet: email.data.snippet || '',
    body,
    attachmentCount,
    attachmentTypes,
  
    gmailUrl:
      `https://mail.google.com/mail/u/0/#all/${msg.id}`
  };
}

function extractBody(payload) {

  if (!payload) return '';

  if (payload.body?.data) {
    return Buffer.from(
      payload.body.data,
      'base64'
    ).toString('utf8');
  }

  if (payload.parts) {

    for (const part of payload.parts) {

      if (
        part.mimeType === 'text/plain' &&
        part.body?.data
      ) {
        return Buffer.from(
          part.body.data,
          'base64'
        ).toString('utf8');
      }

    }

  }

  return '';
}

async function getRecentEmails() {

  const gmail = google.gmail({
    version: 'v1',
    auth: oauth2Client
  });

  const oneDayAgo =
    new Date(Date.now() - 24 * 60 * 60 * 1000);

  const response =
    await gmail.users.messages.list({
      userId: 'me',
      q: `after:${Math.floor(oneDayAgo.getTime() / 1000)}`,
      maxResults: 20
    });

  const messages =
    response.data.messages || [];

  if (messages.length === 0) {
    return [];
  }

  const emails = await Promise.all(

    messages.map(async (msg) => {

      const email =
        await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full'
        });

      const headers =
        email.data.payload.headers || [];

      const subject =
        headers.find(
          h => h.name === 'Subject'
        )?.value || 'No Subject';

      const from =
        headers.find(
          h => h.name === 'From'
        )?.value || 'Unknown';

      return parseEmailDetails(
        email,
        msg,
        from,
        subject
      );

    })

  );

  return emails;
}

module.exports = {
  getRecentEmails
};