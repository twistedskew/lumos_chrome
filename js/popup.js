function resetGamesList(){
  checked_games = [];
  $.each($( ".game-name" ), function(index,object){
    if(object.checked){
      checked_games.push(object.id);
    }
  });
  localStorage['checked'] = JSON.stringify(checked_games);
}

function selectAll(){

}

var checked_games;

$(function (){
  if(!localStorage['checked']){
    localStorage['checked'] = JSON.stringify(games);
  }
  checked_games = JSON.parse(localStorage['checked']);
  var $agency = $('#agency');

  $agency.on('change', function () {
    var value = $agency.find(':selected').val();
    chrome.runtime.sendMessage('Ok, Well take care of: ' + value);
  });

  $.each(games2, function(index, object){
    var checked = "";
    console.log(object.slug);
    console.log(checked_games);
    if($.inArray(object.slug, checked_games) >= 0){
      checked = ' checked';
    } 
    var i = $('<input type="checkbox" id="'+object.slug+'"'+checked+' class="game-name"><label for="'+object.slug+'">'+object.name+'</label>');
    $('#games-list').append(i);
  });
  /*$('#games-list').append('<hr>');

  var hit_all = $('<input type="checkbox" id="hit-all"><label id="hit-all-label" for="hit-all">All</label>');
  $('#games-list').append(hit_all);
  $("#hit-all").button();

  var hit_none = $('<input type="checkbox" id="hit-none"><label id="hit-none-label" for="hit-none">None</label>');
  $('#games-list').append(hit_none);
  $("#hit-none").button();
*/
  $( ".game-name" ).button();
  $( ".game-name" ).click(function(button) {
    resetGamesList();
  });
});
