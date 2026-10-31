import { useState } from "react";

const AUTH_URL = "http://localhost:3001/auth";

function Header() {
    const [isConnected, setIsConnected] = useState(
      () => sessionStorage.getItem("gmailConnected") === "true"
    );

    const handleAuthorize = () => {
      const authWindow = window.open(
        AUTH_URL,
        "gmail-auth",
        "width=520,height=720"
      );

      if (!authWindow) {
        window.location.href = AUTH_URL;
        return;
      }

      const authCheck = window.setInterval(() => {
        if (authWindow.closed) {
          window.clearInterval(authCheck);
          sessionStorage.setItem("gmailConnected", "true");
          setIsConnected(true);
          window.location.reload();
        }
      }, 500);
    };

    return (
      <header className="sticky top-0 z-30 w-full border-b border-primary-container bg-background">
        <div className="mx-auto flex w-full items-center justify-between px-margin-mobile md:px-margin-desktop py-4">
          <div className="flex items-center gap-4">
             
            <h1 className="font-headline-lg text-headline-lg font-bold tracking-tighter uppercase text-on-surface">
              FastMail
            </h1>
          </div>
  
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={handleAuthorize}
              className="font-label-md text-label-md uppercase tracking-widest text-primary border-b-2 border-primary-container transition-colors duration-200 bg-transparent p-0"
            >
              {isConnected ? "CONNECTED" : "AUTHORIZE"}
            </button>
          </nav>         
        </div>
      </header>
    );
  }
  
  export default Header;