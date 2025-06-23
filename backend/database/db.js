import mysql from 'mysql2/promise';
import config from '../config/config.js';
import path from 'path'
import fs from 'fs'
import { error } from 'console';// esta importacion fue por error?

const { db } = config;

const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
    waitForConnections: true,
    // connectionLimit: 10, -> esto creo q no hace falta aclararlo, tengo entendido q es el comportamiento por defecto de mysql2 (a menos que quisieramos especificarle una cantidad distinta, pero en nuestro caso no tiene sentido). Esto habria que chequear si es asi, creo que si, pero por las dudas nomas.
    // queueLimit: 0,
});

const conectionInitialDatabase = async ()=>{
    let connect; // cual es la utilidad de esta variable por fuera del try? se podria ponerle un const al connect dentro del try y eliminar este let?
    try{
        connect = await mysql.createConnection({ // con createPool ya tenemos creadas unas 10 conexiones, en principio no hace falta crear otra, podemos agarrar una de las que ya creamos usando await db.getConnection() (asi seco, sin necesidad de pasarle data).
            host: db.host,
            user: db.user,
            password:db.password,
        });

        await connect.query(`CREATE DATABASE IF NOT EXISTS ${connection.database}`);
        await connect.query(`USE ${connection.database}`);
        // para las dos lineas de arriba: connection.database no existe. mysql.createPool(...) no crea un objeto 'connection' con un atributo 'database'. createPool es un metdodo al que se le pasa un objeto con la data de la conexion y si todo sale bien, devuelve un conjunto de posibles conexiones a la base de datos. si la idea es acceder al nombre de la db, por como lo tenemos armado creo que iria db.name

        const scriptSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
        await connect.query(scriptSQL)

        //Posiblemente condicionarlo a que solo insert los haga en Desarrollo
        const insertsSQL = fs.readFileSync(path.join(__dirname, 'inserts.sql'), 'utf8')
        await connect.query(insertsSQL)
        console.log('database initialized successfully...');
        
        
    }catch(err){
        // throw new Error pareciera estar armado con la estructura de un console.error. Para pasar el mensaje de error instanciando la clase Error la forma seria algo tipo: throw new Error(`Error de conexion de DB: %{err.message}`). 
        throw new Error("Error de conexion de DB: ", err)       
    }
}

export  {connection, conectionInitialDatabase};
