const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const postsRoute  = require('./routes/posts');

app.use('/posts',postsRoute);


// Middlewares
//app.use('/posts',()=>{
//  console.log('This is a middleware running')
//})

// ROUTES
app.get('/',(req,res) => {
  res.send('We are on home');
});

app.get('/posts',(req,res) => {
  res.send('We are on post');
});

// Connect to DB
//mongoose.connect('mongodb+srv://test:test123@cluster0-nrxlw.mongodb.net/<dbname>?retryWrites=true&w=majority',);
// mongodb+srv://test:<password>@cluster0-nrxlw.mongodb.net/test
mongoose.connect(
  //'mongodb+srv://test:test123@cluster0-nrxlw.mongodb.net/test',
  process.env.DB_CONNECTION,
  {useNewUrlParser:true},
  ()=>
  console.log('Connected to DB!')
);

// How do we start listening to the server
app.listen(3000);
