window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

function resetGamesList(){
  checked_games = [];
  $.each($( ".game-name" ), function(index,object){
    if(object.checked){
      checked_games.push(object.id);
    }
  });
  localStorage.checked = JSON.stringify(checked_games);
}

var checked_games;

$(function (){
  var $button = $('#schedule'),
    $time = $('#time');

  if (!localStorage.checked) {
    localStorage.checked = JSON.stringify(games);
  }

  checked_games = JSON.parse(localStorage.checked);

  function schedule () {
    var time = moment($time.val(), 'HH:mm');
    if (time.isValid()) {
      localStorage.setItem('time', time);
      chrome.runtime.sendMessage(+time);
      window.close();
    } else {
			$('#error').show();
		}
  }

  $button.on('click', schedule);
  $time.keypress(function (e) {
    if (e.which == 13) { schedule(); }
  });

  lumos.Repository.byPair(function (slug, name) {
    var $input = $('<input/>', { type: 'checkbox', id: slug }).addClass('game-name')
      , $label = $('<label/>', { for: slug }).text(name);

    if (_(checked_games).contains(slug))
      $input.prop('checked', true);

    $('#games-list').append($input, $label);
  });

  $( ".game-name" ).button();
  $( ".game-name" ).click(function(button) {
    resetGamesList();
  });
});
