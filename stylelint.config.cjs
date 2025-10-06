module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-order"],
  rules: {
    "import-notation": null,
    "selector-class-pattern": "^[a-zA-Z][a-zA-Z0-9]*$", // Разрешает camelCase
    "comment-no-empty": true,
    "no-invalid-double-slash-comments": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["theme", "tailwind", "apply"]
      }
    ],
    "declaration-property-value-no-unknown": null,
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["response"]
      }
    ],
    "no-duplicate-selectors": [true, { disallowInList: false }],
    // Сортировка CSS по логике
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      {
        type: "at-rule",
        name: "supports"
      },
      {
        type: "at-rule",
        name: "media"
      },
      "rules"
    ],
    // Сортировка свойств внутри блока
    "order/properties-order": [
      [
        "position",
        "content",
        "top",
        "right",
        "bottom",
        "left",
        "display",
        "flex",
        "flex-direction",
        "flex-grow",
        "align-items",
        "justify-content",
        "flex-wrap",
        "gap",
        "row-gap",
        "column-gap",
        "overflow",
        "overflow-x",
        "overflow-y",
        "width",
        "max-width",
        "min-width",
        "height",
        "max-height",
        "min-height",
        "padding",
        "margin",
        "border",
        "border-radius",
        "background",
        "background-color",
        "font-family",
        "font-size",
        "line-height",
        "font-weight",
        "color",
        "text-align",
        "white-space",
        "letter-spacing",
        "text-transform",
        "text-decoration",
        "box-shadow",
        "opacity",
        "transition",
        "animation",
        "z-index"
      ],
      {
        unspecified: "bottomAlphabetical"
      }
    ]
  }
};
