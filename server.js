//server.js
const express = require('express');
const cors = require('cors')
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 3000, (req,res) => {
  console.log(
    `server is running at ${port}`
  )
});