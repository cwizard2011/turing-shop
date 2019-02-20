const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql'
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'mysql',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
