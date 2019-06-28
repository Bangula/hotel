const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@actions": path.resolve(__dirname, "src/store/actions"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@endpoints": path.resolve(__dirname, "src/services/http/endpoints")
    }
  }
};
