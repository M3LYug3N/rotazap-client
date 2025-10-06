module.exports = {
  apps: [
    {
      name: "client",
      script: "bun",
      args: "run start",
      cwd: "/home/rotazap/client",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
