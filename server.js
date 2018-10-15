const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4002;
const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.engine('.html', ejs.__express);
app.set("view engine", ".html")

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index', {}));

// app.get('/projects', (req, res) => {
//   res.render('index', {project: "kevin"});
// });
// res.json("API for kevins projects");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url || dbConfig.deployUrl, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to database');
}).catch( err => {
  console.log(`Error connecting to database: ${err}`);
  process.exit();
})


require('./app/routes/project')(app);
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
