/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize :{
        "course-deatials-small-heading": ["26px","30px"],
        "course-deatials-large-heading": ["36px","42px"],
        "home-heading-small": ["28px","34px"],
        "home-heading-large": ["48px","56px"],
        "defult": ["16px","24px"],
      },
      maxWidth :{
        "course-card":"424px"
      },
      boxShadow:{
        "custom-card":"0px 4px 15px 2px rgba(0, 0, 0, 0.1)",
      }




    },
  },
  plugins: [],
}