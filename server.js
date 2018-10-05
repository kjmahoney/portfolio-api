const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4002;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to database');
}).catch( err => {
  console.log(`Error connecting to database: ${err}`);
  process.exit();
})

app.get('/', (req, res) => {
  res.json("API for kevins projects");
});


require('./app/routes/project')(app);
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
