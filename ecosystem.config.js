module.exports = {
  apps : [{
    name: "API",
    script: "./index.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
      USER: process.env.username,
      PASSWORD: process.env.password
    },
    env_production: {
      NODE_ENV: "production",
      USER: process.env.username,
      PASSWORD: process.env.password
    }
  }]
}