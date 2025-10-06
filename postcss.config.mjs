const config = {
  plugins: {
    "postcss-functions": {
      functions: {
        response(minSize, maxSize, rangeKey) {
          const ranges = {
            sm: { minScreen: 490, maxScreen: 768 },
            md: { minScreen: 490, maxScreen: 1024 },
            lg: { minScreen: 490, maxScreen: 1920 },
            lgmd: { minScreen: 768, maxScreen: 1920 }
          };

          minSize = parseFloat(minSize);
          maxSize = parseFloat(maxSize);

          const range = ranges[rangeKey];
          if (!range) throw new Error(`Unknown range key: ${rangeKey}`);

          const slope = maxSize - minSize;
          const screenRange = range.maxScreen - range.minScreen;

          const minRem = (minSize / 16).toFixed(4);
          const maxRem = (maxSize / 16).toFixed(4);

          return `clamp(${minRem}rem, calc(${minRem}rem + ${slope} * ((100vw - ${range.minScreen}px) / ${screenRange})), ${maxRem}rem)`;
        }
      }
    },
    "@tailwindcss/postcss": {}
  }
};

export default config;
