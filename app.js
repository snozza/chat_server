var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  socket.on('messages', function(msg) {
    io.emit('messages', msg);
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var usernames = {};
var numUsers = 0;

io.on('connection', function(socket) {
  var addedUser = false;

  socket.on('new message', function(msg) {
    socket.broadcast.emit('new message', {
      username: socker.username,
      message: msg
    });

    socket.on('add user', function(username) {
      socket.username = username;
      usernames[username] = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
    });

      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    socket.on('typing', function() {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    socket.on('stop typing', function() {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    socket.on('disconnect', function() {
      if (addedUser) {
        delete usernames[socket.username];
        --numUsers;

        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });


server.listen(8080, function() {
  console.log("Server listening on port 8080");
});