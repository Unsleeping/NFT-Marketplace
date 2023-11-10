module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    React: "writable",
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:mocha/recommended",
    "airbnb",
    "next/core-web-vitals",
  ],
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
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "mocha"],
  rules: {
    semi: "off",
    "@typescript-eslint/member-delimiter-style": 0,
    "react/require-default-props": 0,
    "@typescript-eslint/comma-dangle": 0,
    "react/jsx-wrap-multilines": 0,
    "operator-linebreak": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "comma-dangle": 0,
    quotes: ["error", "double"],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/explicit-function-return-type": [
      0,
      { allowIIFEs: false },
    ],
    "no-console": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-nested-ternary": 0,
    "consistent-return": 0,
    "no-alert": 0,
    "react/jsx-no-constructed-context-values": 0,
    "import/extensions": 0,
    "react/prop-types": 0,
    "linebreak-style": 0,
    "react/state-in-constructor": 0,
    "import/prefer-default-export": 0,
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "max-len": [2, 550],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_d", "_dh", "_h", "_id", "_m", "_n", "_t", "_text"],
      },
    ],
    "object-curly-newline": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/alt-text": 0,
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
  },
};
