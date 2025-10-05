module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
    "plugin:prettier/recommended", // ✅ Prettier runs inside ESLint
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",

    // ✅ Warnings only
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-redeclare": "warn",

    // ✅ Allow || instead of forcing ??
    "prefer-nullish-coalescing": "off",

    // ❌ REMOVE this, Prettier handles quotes
    // "quotes": ["warn", "double", { "avoidEscape": true }],

    // ❌ REMOVE this, Prettier handles semicolons
    // "semi": ["warn", "always"]
  },
};
