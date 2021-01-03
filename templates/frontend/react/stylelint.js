module.exports = function () {
  return `{
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
    "stylelint-config-css-modules"
  ],
  "plugins": ["stylelint-prettier", "stylelint-order"],
  "rules": {
    "prettier/prettier": true,
    "order/properties-alphabetical-order": true
  }
}
`;
};
