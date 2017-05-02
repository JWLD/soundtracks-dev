const Fs = require('fs');

const dbConnect = require('./db_connect.js');

const sql = Fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnect.query(sql, (err) => {
  if (err) return console.log(err);

  console.log('Tables successfully created!');

  return process.exit();
});
