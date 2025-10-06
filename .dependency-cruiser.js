/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment:
        "В проекте найдена циклическая зависимость. Это нарушает чистоту архитектуры.",
      from: {},
      to: { circular: true }
    }
  ],
  options: {
    tsConfig: {
      fileName: "tsconfig.json"
    },
    doNotFollow: {
      path: ["node_modules"]
    },
    enhancedResolveOptions: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      mainFields: ["module", "main"]
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)"
      }
    }
  }
};
