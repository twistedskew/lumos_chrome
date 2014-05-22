$(function() {

  if(!localStorage['checked']){
    localStorage['checked'] = JSON.stringify(games);
  }

  checked_games = JSON.parse(localStorage['checked']);
  if(checked_games.length>0){
    $('#innerdiv').attr('src', 'http://lumosity.com/app/v4/games/' + checked_games[Math.floor(Math.random()*checked_games.length)]);
  }else{
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  }

});
