const express = require('express');
const dotenv= require('dotenv');
const morgan=require('morgan');
const bodyparser= require('body-parser');
const path=require('path');

const connectDB= require('./server/database/connection');

const app=express(); //initialize the application as express app


dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse req to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs')

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(3000,()=>{console.log(`Server is running on http://localhost:${PORT}`)
})