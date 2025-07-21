import mysql from 'mysql2/promise';
import config from '../config/config.js';

const { db } = config;

export const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
    port: db.port, 
    waitForConnections: true,
});

export const sqlConnection = async () =>{
    try {
      const dbConnection = await connection.getConnection();
      console.log("Conectado a MySQL");
      dbConnection.release();
    } catch (err) {
      console.error("No se pudo conectar con MySQL:", err.message);
    }
}

