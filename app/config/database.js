import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ProposEvent'
})

connection.connect(err => {
  if (err) throw err;
  console.log('Connection!');
})