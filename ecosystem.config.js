module.exports = {
  apps: [{
    name: "react",
    script: "server.prod.js",
    watch: true,
    instances: 2,
    exec_mode: "cluster",
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    },
    out_file: "./logs/pm2-react-out.log",
    error_file: "./logs/pm2-react-error.log",
    log_date_format: "YYYY-MM-DD HH:mm",
    kill_timeout: 1600,
    max_restarts: 10
  }]
}
