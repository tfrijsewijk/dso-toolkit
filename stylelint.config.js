/** @type {import("stylelint").Config} */
module.exports = {
  extends: "stylelint-config-recommended-scss",
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  reportDescriptionlessDisables: true,
  defaultSeverity: "error",
  rules: {
    // ex @infoprojects/stylelint-config-scss
    "no-descending-specificity": null,
    "scss/at-mixin-argumentless-call-parentheses": "always",
    // local
    "declaration-property-value-disallowed-list": {
      "text-overflow": ["ellipsis"],
      "white-space": ["nowrap"],
    },
  },
  overrides: [
    {
      files: ["packages/dso-toolkit/src/icons/**.scss"],
      rules: {
        "selector-pseudo-class-no-unknown": null,
        "selector-type-no-unknown": null,
      },
    },
  ],
};
