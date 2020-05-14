const mysql = require('mysql')

const con = mysql.createConnection({
  host: '192.168.64.2',
  user: 'romeo',
  password: 'qw123456',
  database: 'jooku',
  multipleStatements: true
})

con.connect((error) => {
  if (error) {
    console.log('connect error')
  } else {
    console.log('connect success')
  }
})

module.exports = con
