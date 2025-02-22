/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Correct plugin name
    autoprefixer: {}, // Recommended to include for vendor prefixes
  },
};
export default config;