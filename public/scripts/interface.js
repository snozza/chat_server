$(document).ready(function() {
  var TYPING_TIMER = 500;

  var socket = io();

  var $window = $(window);
  var $loginForm = $('#login');
  var $userInput = $('#name');
  var $messages = $('#msgContainer');
  var $chatForm = $('#chatForm');
  var $inputMessage = $('#chatInput');

  var username;
  var connection = false;
  var typing = false;
  var lastTypingTime;

  function newUser() {
    username = $userInput.val();
    console.log(username);

    if (username) {
      $loginForm.fadeOut();
      $chatForm.show();

      socket.emit('add user', username)
    }
  }

  $loginForm.on('submit', function(event) {
    event.preventDefault();
    newUser();
  });

});