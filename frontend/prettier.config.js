/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 80,
    plugins: ['prettier-plugin-tailwindcss'],
    // Tailwind 4 não usa mais tailwind.config.js; o plugin lê o tema do CSS.
    tailwindStylesheet: './src/app/globals.css',
    tailwindFunctions: ['cn', 'cva'],
};

module.exports = config;
