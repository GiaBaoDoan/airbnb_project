/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    darkTheme: "light",
  },
  theme: {
    fontFamily: {
      "my-font": "Open Sans, system-ui",
    },
    extend: {
      svg: {
        "my-icon":
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
      },
      // custom
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
      },
      fontWeight: {
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
      spacing: {
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        40: "40px",
      },
      colors: {
        mainColor: "#FF385C",
      },
      boxShadow: {
        "custom-shadow": "backdrop-filter blur(20px) brightness(120%)",
      },
      screens: {
        ip678: "376px",
        ip678Plus: "415px",
        ipad: "950px",
        tablet: "560px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        mdDesk: "1500px",
        MaxDesk: "1800px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
};
