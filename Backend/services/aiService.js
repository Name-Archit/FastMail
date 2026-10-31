const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function summarizeEmail(email) {

  const prompt = `
You are FastMail.

Summarize this email for a busy user.

Rules:

- Maximum 25 words
- Do not include URLs
- Do not repeat email addresses
- Do not mention "this email"
- Explain why it matters
- Plain English
- One sentence only

Sender:
${email.from}

Subject:
${email.subject}

Body:
${email.body || email.snippet}

Sender:
${email.from}

Subject:
${email.subject}

Email Body:
${email.body || email.snippet}

Rules:
- Maximum 40 words
- No greetings
- No bullet points
- Only the summary
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

  return completion
    .choices[0]
    .message
    .content;
}

module.exports = {
  summarizeEmail
};