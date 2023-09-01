// import mysql from 'mysql'
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'penjadwalan-app'
})

module.exports = conn