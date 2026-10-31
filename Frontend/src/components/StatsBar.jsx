import { useEffect, useState } from "react";

const EMAILS_API_URL = "http://localhost:3001/emails";
const SUMMARY_API_URL = "http://localhost:3001/ai/summary";

function StatsBar() {
    const [totalEmails, setTotalEmails] = useState(0);
    const [totalAttachments, setTotalAttachments] = useState(0);

    useEffect(() => {
      const loadStats = async () => {
        try {
          const emailsResponse = await fetch(EMAILS_API_URL);
          const emails = await emailsResponse.json();

          if (Array.isArray(emails)) {
            setTotalEmails(emails.length);
          }
        } catch (error) {
          console.error("Unable to load email count", error);
        }

        try {
          const summaryResponse = await fetch(SUMMARY_API_URL);
          const summary = await summaryResponse.json();
          const emails = Array.isArray(summary.emails) ? summary.emails : [];

          setTotalAttachments(
            emails.reduce(
              (total, email) => total + Number(email.attachments?.count || 0),
              0
            )
          );
        } catch (error) {
          console.error("Unable to load attachment count", error);
        }
      };

      loadStats();
    }, []);

    return (
      <section className="border-y border-outline-variant bg-surface px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start md:border-r border-outline-variant md:pr-12">
            <span className="font-mono-sm  bg-primary-container px-3 py-1 text-mono-sm uppercase tracking-widest text-white mb-2">
              Total Emails
            </span>
  
            <div className="font-display-lg text-display-lg text-white">
              {totalEmails}
            </div>
          </div>
  
          <div className="flex flex-col items-start md:border-r border-outline-variant md:pr-12">
            <span className="font-mono-sm  bg-primary-container px-3 py-1 text-mono-sm uppercase tracking-widest text-white mb-2">
              Total Attachments
            </span>
  
            <div className="font-display-lg text-display-lg text-white">
              {totalAttachments}
            </div>
          </div>
  
          <div className="flex flex-col items-start">
            <span className="font-mono-sm bg-primary-container px-3 py-1 text-mono-sm uppercase tracking-widest text-white mb-2">
              High Priority
            </span>
  
            <div className="font-display-lg text-display-lg text-white">
              45
              <span className="text-headline-lg font-normal ml-2">m</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default StatsBar;