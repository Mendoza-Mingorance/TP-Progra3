import mysql from 'mysql2/promise';
import config from '../config/config.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { db } = config;

const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
    waitForConnections: true,
});

const conectionInitialDatabase = async () => {
    try {
        const connectTemp = await mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
        }); //Creo la conexion temporal en caso de que no este creada la base de datos

        await connectTemp.query(`CREATE DATABASE IF NOT EXISTS ${db.name}`);
        await connectTemp.end();

        const connect = await connection.getConnection(); //Tomo la conexion ya hecha en el CreatePool para hacer los inserts

        const scriptSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        const createsDbScript = scriptSQL
            .split(';')//Corto el array cada sentencia que termina
            .map(s => s.trim())// limpio los espacios en blanco
            .filter(Boolean);//solo me traigo las lineas que esten llenas 

        for (const ele of createsDbScript) {
            await connect.query(ele);
        }

        if (config.env === 'development') {
            //Solo hago los inserts en modo desarrollo para que no afecte en caso de que lo pasemos a produccion
            const [categories] = await connect.query("SELECT COUNT(*) AS total FROM categories")
            //Reviso si la tabla de categories esta llena
            // console.log(categories);           
            if(categories[0].total === 0){//Si no esta llena, cargo el script SQL 
                const insertsSQL = fs.readFileSync(path.join(__dirname, 'inserts.sql'), 'utf8');
                const inserts = insertsSQL
                    .split(';') //Corto el array en cada sentencia que termina ;
                    .map(s => s.trim()) // limpio los espacios en blanco
                    .filter(Boolean);//solo me traigo las lineas que esten llenas 
    
                for (const ele of inserts) {
                    await connect.query(ele);
                }        
            }
            // console.log('Datos de insertados.');
        }
        console.log('database initialized successfully...');
    } catch (err) {
        console.error('Error de conexion de DB: ', err);
    }
};

conectionInitialDatabase();

export { connection, conectionInitialDatabase };

