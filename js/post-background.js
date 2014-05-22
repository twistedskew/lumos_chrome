$(function() {

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
