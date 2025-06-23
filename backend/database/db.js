import mysql from 'mysql2/promise';
import config from '../config/config.js';
import path from 'path'
import fs from 'fs'
import { error } from 'console';

const { db } = config;

const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
    waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
});

const conectionInitialDatabase = async ()=>{
    let connect;
    try{
        connect = await mysql.createConnection({
            host: db.host,
            user: db.user,
            password:db.password,
        });

        await connect.query(`CREATE DATABASE IF NOT EXISTS ${connection.database}`);
        await connect.query(`USE ${connection.database}`);

        const scriptSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
        await connect.query(scriptSQL)

        //Posiblemente condicionarlo a que solo insert los haga en Desarrollo
        const insertsSQL = fs.readFileSync(path.join(__dirname, 'inserts.sql'), 'utf8')
        await connect.query(insertsSQL)
        console.log('database initialized successfully...');
        
        
    }catch(err){
        throw new Error("Error de conexion de DB: ", err)       
    }
}

export  {connection, conectionInitialDatabase};
