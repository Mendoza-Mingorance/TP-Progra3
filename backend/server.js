import express from 'express';
import config from './config/config.js';
import cors from 'cors';
import indexRouter from './routes/index.router.js';
import { conectionInitialDatabase } from './database/db.js';
import { sqlConnection } from './database/db.js';
import cookieParser from 'cookie-parser';
import fs from 'fs'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
const uploadPath = './uploads';

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
app.use('/uploads', express.static('updateProductModel'));

app.set('view engine', 'ejs');

await sqlConnection();
await conectionInitialDatabase();
app.listen(config.port, () => {
    console.log(`Server running in ${config.port}`);
});
