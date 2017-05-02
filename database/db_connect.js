const { Pool } = require('pg');
const Url = require('url');
require('env2')('./config.env');

if (!process.env.DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL must be set');
}

const params = Url.parse(process.env.DATABASE_URL);
const [user, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_CONNECTIONS || 2,
  user,
  password,
  ssl: params.hostname !== 'localhost'
};

module.exports = new Pool(options);
