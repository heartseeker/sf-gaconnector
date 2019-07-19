module.exports = {
  apps : [{
    name: "API",
    script: "./index.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
      USERNAME: process.env.username
    },
    env_production: {
      NODE_ENV: "production",
      PASSWORD: process.env.password
    }
  }]
}