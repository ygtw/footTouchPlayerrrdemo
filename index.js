var express = require("express"),
    app = express(),
    bodyParser = require('body-parser')
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var uuid = require('node-uuid');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.get('/', function(req, res){
  res.sendfile('index.html');
  id++
  var uuid1 = uuid.v4(); // e.g. 32a4fbed-676d-47f9-a321-cb2f267e2918
  console.log(uuid1);
//  io.emit('chat message', msg);
});




io.on('connection', function(socket){
  console.log(socket.id);
  ida = socket.id;
  socket.broadcast.to(ida).emit('init', ida);


  socket.on('say to someone', function(Suuid, msg){
    console.log(Suuid)
    socket.broadcast.to(Suuid).emit('chat message', msg);
  });


  socket.on('init', function(Suuid, msg){
    console.log(Suuid)
    socket.broadcast.to(Suuid).emit('init', msg);
  });

  socket.on('chat message', function(msg){
        
      //  console.log(socket.transport.sessid  )

    socket.broadcast.to(ida).emit('init', ida);
  });

   

});


var port = Number(process.env.PORT || 5000);

http.listen(port , function(){
  console.log('listening on *:3000');
});
