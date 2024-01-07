require('dotenv').config();

const { DEV_DATABASE_HOST, DEV_DATABASE_USERNAME, DEV_DATABASE_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: "node_sequelize",
    host: DEV_DATABASE_HOST,
    dialect: "postgres",
    // privateKey: PRIVATE_KEY
  },
  test: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: "node_sequelize",
    host: DEV_DATABASE_HOST,
    dialect: "postgres",
    // privateKey: PRIVATE_KEY
  },
  production: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: "node_sequelize",
    host: DEV_DATABASE_HOST,
    dialect: "postgres",
    // privateKey: PRIVATE_KEY
  }
}
