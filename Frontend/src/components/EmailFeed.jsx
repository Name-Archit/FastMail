import { useEffect, useState } from "react";
import EmailCard from "./EmailCard";

const API_URL = "http://localhost:3001/emails";

function getPriority(email) {
  const source = `${email.from || ""} ${email.subject || ""}`.toLowerCase();

  if (
    source.includes("linkedin") ||
    source.includes("naukri") ||
    source.includes("unstop")
  ) {
    return "high";
  }

  if (
    source.includes("codechef") ||
    source.includes("codeforces")
  ) {
    return "medium";
  }

  return "normal";
}

function parseSender(from = "") {
  const match = from.match(/^(.*)<(.+)>$/);

  if (!match) {
    return {
      senderName: from || "UNKNOWN",
      senderEmail: from || "unknown",
    };
  }

  return {
    senderName: match[1].replace(/"/g, "").trim() || match[2].trim(),
    senderEmail: match[2].trim(),
  };
}

function formatTimestamp(internalDate) {
  if (!internalDate) {
    return "UNKNOWN // UTC";
  }

  const date = new Date(Number(internalDate));

  return `${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  })} // UTC`;
}

function mapEmail(email) {
  const sender = parseSender(email.from);

  return {
    ...sender,
    category: "Inbox",
    timestamp: formatTimestamp(email.internalDate),
    subject: email.subject || "No Subject",
    summary: email.snippet || "",
    tags: ["Gmail"],
    priority: getPriority(email),
  };
}

function EmailFeed() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (Array.isArray(data)) {
          setEmails(data.map(mapEmail));
        }
      } catch (error) {
        console.error("Unable to load emails", error);
      }
    };

    loadEmails();
  }, []);

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap grow">
      <div className="mb-12 flex justify-between items-end border-b border-outline-variant pb-4">
        <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary-container">
          Critical Feed // 01
        </h3>

        <span className="font-mono-sm text-mono-sm text-on-surface-variant opacity-50">
          SCANNED_TOTAL: {emails.length} ITEMS
        </span>
      </div>

      <div className="flex flex-col space-y-6">
        {emails.map((email) => (
          <EmailCard key={email.subject + email.senderEmail} {...email} />
        ))}
      </div>
    </section>
  );
}

export default EmailFeed;