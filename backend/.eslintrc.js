module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    //"@typescript-eslint/no-explicit-any": "off", // Ignoring any type errors
    "@typescript-eslint/no-unused-vars": "off", // Ignoring unused variables
    "@typescript-eslint/no-var-requires": "off", // Ignoring require statements not part of import
    "prefer-const": "off", // Ignoring const usage preference
  },
};
