module.exports = {
  apps: [
    {
      name: "client",
      script: "/home/rotazap/.bun/bin/bun",
      args: "run start",
      cwd: "/home/rotazap/rotazap-client",
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      }
    }
  ]
};
