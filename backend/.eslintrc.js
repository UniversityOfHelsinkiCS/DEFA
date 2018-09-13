module.exports = {
  "parser": "typescript-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "plugins": [
    "typescript"
  ],
  "rules": {
    "quotes": ["warn", "single"],
    "indent": ["warn", 4, { "SwitchCase": 1 }],
    "semi": ["error", "never"],
    "comma-dangle": ["warn", "never"],
    "max-len": ["warn", 120],
    "function-paren-newline": "off",

    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-escape": "warn"

  }
}