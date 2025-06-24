import express from 'express';
import config from './config/config.js';
import indexRouter from './routes/index.router.js';
import { conectionInitialDatabase } from './database/db.js';
import { sqlConnection } from './database/db.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRouter)

app.set("view engine", "ejs")

await sqlConnection()
await conectionInitialDatabase()
app.listen(config.port, ()=>{
    console.log(`Server running in ${config.port}`);
})



