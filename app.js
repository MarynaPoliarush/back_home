const express = require('express');
const catalog = require('./routes')
const cors = require("cors");
const path = require('path')
const db = require('./data');

const app = express();

app.use(cors())
app.options('*', cors())


app.set('views', path.join(__dirname, 'views'))		
app.set('view engine', 'ejs')	

app.use(express.json())
app.use(express.static('public')); // Serve static files (e.g. CSS files)
// app.use('/uploadedIMG',express.static('uploadedIMG'));
app.use(express.static(__dirname))

	

app.use('/', catalog);


db.connectToDatabase().then(function () {
  app.listen(5000)
  console.log('DATABASE CONNECTED')
})

