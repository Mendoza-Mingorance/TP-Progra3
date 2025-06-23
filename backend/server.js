import express from 'express';
import config from './config/config.js';
import indexRouter from './routes/index.router.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', indexRouter)

app.set("view engine", "ejs")

app.use('/', (req,res)=>{
    res.render('index')
})
app.listen(config.port, ()=>{
    console.log(`Server running in ${config.port}`);
})



