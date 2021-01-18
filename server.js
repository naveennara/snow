const express = require('express');
//const http = require('http');
const path = require('path');
const app = express();

const port = process.env.PORT || 4567;
var https = require('https');
var fs = require('fs');
var options = {
   // key  : fs.readFileSync('./coordsz_com/coordsz.key'),
   // pfx : fs.readFileSync('./coordsz_com/coordsz.pfx'),
   // passphrase:'magikminds'
   cert : fs.readFileSync('./certificates/localhost.cert'),
   key  : fs.readFileSync('./certificates/localhost.key')

  // ca: [fs.readFileSync('./formszcom/Intermediate-gdig2.crt')]
};
//console.log(options);
https.createServer(options, app).listen(port, function () {
   console.log('Started!');
});
//app.set('port',  3001);
app.use(express.static(__dirname + '/dist/FormszMigration'));

app.get('/*',(req,res)=> res.sendFile(path.join(__dirname)));

//const server = http.createServer(app);

//server.listen(port,()=> console.log('Running..'));