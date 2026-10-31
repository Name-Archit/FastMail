import { useEffect, useState } from "react";

function HeroSection() {
    const [lastUpdatedTime, setLastUpdatedTime] = useState("");

    useEffect(() => {
      const now = new Date();

      setLastUpdatedTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, []);

    return (
      <section className="px-margin-mobile md:px-margin-desktop pt-24 pb-section-gap relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-block bg-primary-container px-3 py-1 mb-6">
            <span className="font-mono-sm text-mono-sm uppercase font-bold tracking-widest text-white">
              Updated: {lastUpdatedTime}
            </span>
          </div>
  
          <h2 className="text-[64px] md:text-[110px] leading-[0.9] font-extrabold tracking-tighter uppercase text-white mb-6">
            YOUR INBOX.
            <br />
            SUMMARIZED.
          </h2>
  
          <p className="font-body-lg text-body-lg border-l border-primary-container pl-6 text-on-surface-variant max-w-md opacity-80">
            Last 24 hours of emails, distilled into actionable intelligence using
            quantum-linguistic processing.
          </p>
        </div>
  
        <div className="absolute top-1/2 right-[-10%] md:right-0 -translate-y-1/2 w-96 h-96 opacity-20 pointer-events-none animate-float">
          <div className="w-full h-full border border-primary-container rotate-45 flex items-center justify-center relative">
            <div className="w-2/3 h-2/3 border border-primary-container rotate-45"></div>
  
            <div className="absolute top-0 left-0 w-4 h-4 bg-primary-container"></div>
  
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary-container"></div>
          </div>
        </div>
      </section>
    );
  }
  
  export default HeroSection;