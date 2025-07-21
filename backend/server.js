import express from 'express';
import config from './src/api/config/config.js';
import cors from 'cors';
import indexRouter from './src/api/routes/index.router.js';
import { sqlConnection } from './src/api/database/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
// import { checkUploadDir } from './src/api/middlewares/uploadImg.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const uploadPath = path.join(__dirname, 'src/public/uploads')


const app = express();

// app.use(checkUploadDir(uploadPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

await sqlConnection();
app.listen(config.port, () => {
    console.log(`Server running in ${config.port}`);
});
