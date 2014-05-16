$(function() {/*
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://static.sl.lumosity.com/compiled/trainer/lumosity_bridge-5bfbfa77a06a9de722bd79b2528e59a9.swf', true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    var $obj = $('#game-canvas');
    $obj.attr('data', window.URL.createObjectURL(this.response));
  };

  xhr.send();*/

  user = getUser();

  name = user.unique_name || user.email_address

  $('#username').text(name);

  window['sendToJavaScript'] = function(data) {
    var eventName = data.shift();
    console.log('Received ' + eventName + ' with ' + data + ' from AS');
    //$t.trigger(eventName, data);
  };

  if(!localStorage['checked']){
    localStorage['checked'] = JSON.stringify(games);
  }

  checked_games = JSON.parse(localStorage['checked']);
  if(checked_games.length>0){
    $('#innerdiv').attr('src', 'http://lumosity.com/app/v4/games/' + checked_games[Math.floor(Math.random()*checked_games.length)]);
  }else{
    $('#outerdiv').append('<h3 style="color: red">Please select some games!</h3>');
  }

});
