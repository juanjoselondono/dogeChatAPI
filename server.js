const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const socket = require('./socket')
const router = require('./network/routes')
const cors = require('cors')
const db = require('./db')
const port = 3000; 
db();
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.json());
socket.connect(server);
router(app)
app.use('/chat', express.static(__dirname + './public'))
app.use(express.static('./public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
server.listen(port, ()=>console.log(`Api running at http://localhost:${port}`))