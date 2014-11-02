$(document).ready(function() {
  var TYPING_TIMER = 500;

  var socket = io();

  var $window = $(window);
  var $loginForm = $('#login');
  var $userInput = $('#name');
  var $messages = $('#msgContainer');
  var $chatForm = $('#chatForm');
  var $chatInput = $('#chatInput');

  var username;
  var connection = false;
  var typing = false;
  var lastTypingTime;

  function newUser() {
    username = $userInput.val();

    if (username) {
      $loginForm.fadeOut();
      $chatForm.fadeIn();
      console.log(username);

      socket.emit('add user', username);
    }
  }

  function sendMessage() {
    var message = $chatInput.val();
    if (message) {
      $chatInput.val('');
      addMsg({
        message: message,
        username: username
      });
      
      socket.emit('new message', message);
    }
  }

  function addMsg(details) {
    var $userP = $('<p>').text(details.username);
    var $msgP = $('<p>').text(details.message);
    var $messageItem = $('<li class=chat/>')
      .data('username', details.username)
      .append($userP, $msgP);
    $messages.append($messageItem);
    $messages[0].scrollTop = $messages[0].scrollHeight;
    console.log($messages[0])

    }

  $loginForm.on('submit', function(event) {
    event.preventDefault();
    newUser();
  });

  $chatForm.on('submit', function(event) {
    event.preventDefault();
    sendMessage()
  });

  socket.on('new message', function(details) {
    addMsg(details);
  });



});