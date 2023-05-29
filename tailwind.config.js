/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{tsx,ts}",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgba(233, 69, 208, 1)",
        "th-gray": "rgba(242, 228, 241, 1)"
      },
      fontFamily: {
        "nebula": "Nebula",
        "jakarta": "Plus Jakarta Sans, sans-serif"
      },
      backgroundImage: {
        'gr-purple': "linear-gradient(90deg, rgba(56, 28, 77, 0.8) 0%, rgba(31, 7, 30, 0.8) 100%)",
        'gr-purple-light': "linear-gradient(206.04deg, #6F40B0 -0.61%, #1E162E 57.68%)"
      },
      backdropBlur: {
        'gr-purple': "blur(10px)"
      },
      borderRadius: {
        '20': "20px"
      }
    },
    backgroundImage: {
      "primary-image": "url(/images/theme-bg.png)"
    },
    backgroundPosition: {
      "primary-image": "center"
    },
    backgroundSize: {
      "primary-image": "cover"
    },
    boxShadow: {
      "navigation-item": "0px 10px 30px #E945D0"
    }
  },
  plugins: [
    // require("daisyui"),
  ],
}

