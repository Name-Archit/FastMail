function Footer() {
    return (
      <footer className="w-full relative py-section-gap border-t border-outline-variant mt-auto overflow-hidden">
        <div className="font-display-xl text-display-xl opacity-5 uppercase absolute left-0 bottom-[-20px] pointer-events-none select-none whitespace-nowrap">
          INBOX INBOX INBOX INBOX INBOX INBOX
        </div>
  
        <div className="flex flex-col md:flex-row justify-between items-start px-margin-desktop w-full relative z-10 gap-12">
          <div className="max-w-xs">
            <h5 className="font-label-md text-label-md text-primary-container uppercase mb-4 tracking-tighter">
              System Intelligence
            </h5>
  
            <p className="font-body-md text-body-md text-white opacity-80">
              VOLT_MAIL utilizes neural summarization to condense complex
              communication into essential data points. All data is encrypted
              locally.
            </p>
          </div>
  
          <div className="max-w-xs">
            <h5 className="font-label-md text-label-md text-primary-container uppercase mb-4 tracking-tighter">
              Terminal Status
            </h5>
  
            <p className="font-body-md text-body-md text-white opacity-80">
              Version 2.0.44-DELTA
              <br />
              Node: XE-9982
              <br />
              Status: OPTIMIZED
            </p>
          </div>
  
          <div className="md:text-right flex flex-col items-start md:items-end">
            <div className="font-label-md text-label-md text-on-surface mb-4">
              ©2024 VOLT_MAIL TERMINAL
            </div>
  
            <div className="flex gap-6">
              <a
                href="#"
                className="font-mono-sm text-mono-sm text-secondary-fixed-dim hover:text-primary-container transition-colors"
              >
                PRIVACY_PROTOCOL
              </a>
  
              <a
                href="#"
                className="font-mono-sm text-mono-sm text-secondary-fixed-dim hover:text-primary-container transition-colors"
              >
                SYSTEM_STATUS
              </a>
  
              <a
                href="#"
                className="font-mono-sm text-mono-sm text-secondary-fixed-dim hover:text-primary-container transition-colors"
              >
                ENCRYPTION_LOGS
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;