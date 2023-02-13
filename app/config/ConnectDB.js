import mysql from 'mysql'

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'penjadwalan-app'
})

export default conn