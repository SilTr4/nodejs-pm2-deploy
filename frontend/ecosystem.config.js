require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, FILE, DEPLOY_HOST, DEPLOY_PATH, KEY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      key: KEY_PATH,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/SilTr4/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ${FILE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/frontend`,
      'post-deploy': 'cd frontend && npm i && npm audit fix --force && npm run build',
    },
  },
};
