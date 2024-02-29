import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    hsot: "mysqlblog",
    port: 3306,
    user: 'root',
    database: 'blog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;