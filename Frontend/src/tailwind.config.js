/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "surface": "#200f0c",
          "surface-dim": "#200f0c",
          "surface-bright": "#4a3430",
          "surface-container-lowest": "#1a0a07",
          "surface-container-low": "#291714",
          "surface-container": "#2e1b18",
          "surface-container-high": "#392522",
          "surface-container-highest": "#452f2c",
          "on-surface": "#fddbd5",
          "on-surface-variant": "#e8bdb6",
          "inverse-surface": "#fddbd5",
          "inverse-on-surface": "#402b28",
          "outline": "#ae8882",
          "outline-variant": "#5e3f3a",
          "surface-tint": "#ffb4a8",
  
          "primary": "#ffb4a8",
          "on-primary": "#690000",
          "primary-container": "#cc0000",
          "on-primary-container": "#ffdad4",
          "inverse-primary": "#c00000",
  
          "secondary": "#c6c6c7",
          "on-secondary": "#2f3131",
          "secondary-container": "#454747",
          "on-secondary-container": "#b4b5b5",
  
          "tertiary": "#c8c6c5",
          "on-tertiary": "#313030",
          "tertiary-container": "#656464",
          "on-tertiary-container": "#e4e1e1",
  
          "error": "#ffb4ab",
          "on-error": "#690005",
          "error-container": "#93000a",
          "on-error-container": "#ffdad6",
  
          "primary-fixed": "#ffdad4",
          "primary-fixed-dim": "#ffb4a8",
          "on-primary-fixed": "#410000",
          "on-primary-fixed-variant": "#930000",
  
          "secondary-fixed": "#e2e2e2",
          "secondary-fixed-dim": "#c6c6c7",
          "on-secondary-fixed": "#1a1c1c",
          "on-secondary-fixed-variant": "#454747",
  
          "tertiary-fixed": "#e5e2e1",
          "tertiary-fixed-dim": "#c8c6c5",
          "on-tertiary-fixed": "#1c1b1b",
          "on-tertiary-fixed-variant": "#474646",
  
          "background": "#200f0c",
          "on-background": "#fddbd5",
          "surface-variant": "#452f2c",
        },
  
        spacing: {
          unit: "4px",
          "container-max": "1440px",
          gutter: "24px",
          "margin-mobile": "16px",
          "margin-desktop": "64px",
          "section-gap": "128px",
        },
  
        fontFamily: {
          "display-xl": ["Geist"],
          "display-lg": ["Geist"],
          "headline-lg": ["Geist"],
          "headline-lg-mobile": ["Geist"],
          "body-lg": ["Geist"],
          "body-md": ["Geist"],
          "label-md": ["Geist"],
          "mono-sm": ["Geist"],
        },
  
        fontSize: {
          "display-xl": [
            "80px",
            {
              lineHeight: "88px",
              letterSpacing: "-0.04em",
              fontWeight: "800",
            },
          ],
          "display-lg": [
            "56px",
            {
              lineHeight: "60px",
              letterSpacing: "-0.03em",
              fontWeight: "700",
            },
          ],
          "headline-lg": [
            "32px",
            {
              lineHeight: "40px",
              letterSpacing: "-0.02em",
              fontWeight: "700",
            },
          ],
          "headline-lg-mobile": [
            "24px",
            {
              lineHeight: "32px",
              letterSpacing: "-0.02em",
              fontWeight: "700",
            },
          ],
          "body-lg": [
            "18px",
            {
              lineHeight: "28px",
              fontWeight: "400",
            },
          ],
          "body-md": [
            "16px",
            {
              lineHeight: "24px",
              fontWeight: "400",
            },
          ],
          "label-md": [
            "14px",
            {
              lineHeight: "20px",
              letterSpacing: "0.05em",
              fontWeight: "600",
            },
          ],
          "mono-sm": [
            "12px",
            {
              lineHeight: "16px",
              letterSpacing: "0.1em",
              fontWeight: "500",
            },
          ],
        },
      },
    },
    plugins: [],
  };