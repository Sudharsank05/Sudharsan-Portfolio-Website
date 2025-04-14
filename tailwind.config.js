/** @type {import('tailwindcss').Config} */
module.exports = {
            mode: 'jit',
            // ... rest of your config
    "content": [
          "./*.{html,js}",
          "./!(build|dist|.*)/**/*.{html,js}"
    ],
    "theme": {
          "aextend": {
                "colors": {
                      "gray": {
                            "100": "#212121",
                            "200": "#191825",
                            "300": "#191919",
                            "400": "#101010"
                      },
                      "whitesmoke": "#f3f3f3",
                      "red": {
                            "100": "#ff0909",
                            "200": "#ff0000"
                      },
                      "white": "#fff",
                      "linen": "#eee5e0",
                      "black": "#000",
                      "gainsboro": {
                            "100": "#d9d9d9",
                            "200": "rgba(217, 217, 217, 0.7)"
                      },
                      "royalblue": {
                            "100": "#6078ff",
                            "200": "#1e71ff"
                      },
                      "mediumslateblue": "#3651ea",
                      "darkslategray": "#383838"
                },
                "fontFamily": {
                      "anton": "Anton",
                      "birthstone-bounce": "'Birthstone Bounce'",
                      "lato": "Lato",
                      "poppins": "Poppins",
                      "league-spartan": "'League Spartan'",
                      "inherit": "inherit"
                },
                "borderRadius": {
                      "xl": "20px",
                      "3xs": "10px",
                      "41xl": "60px",
                      "21xl": "40px"
                },
                "padding": {
                      "10xl": "29px",
                      "xl": "20px",
                      "21xl": "40px",
                      "13xl": "32px"
                }
          },
          "fontSize": {
                "3xl": "22px",
                "5xl": "24px",
                "151xl": "170px",
                "41xl": "60px",
                "sm": "14px",
                "21xl": "40px",
                "lg": "18px",
                "9xl": "28px",
                "inherit": "inherit"
          }
    },
    plugins: {
      "@tailwindcss/postcss": {},
    },
    "corePlugins": {
      
          "preflight": false
    }
}