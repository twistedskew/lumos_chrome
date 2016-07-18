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

  $.each(games2, function(index, object){
    var checked = "";
    console.log(object.slug);
    console.log(checked_games);
    if ($.inArray(object.slug, checked_games) >= 0) {
      checked = ' checked';
    }
    var i = $('<input type="checkbox" id="'+object.slug+'"'+checked+' class="game-name"><label for="'+object.slug+'">'+object.name+'</label>');
    $('#games-list').append(i);
  });
  $( ".game-name" ).button();
  $( ".game-name" ).click(function(button) {
    resetGamesList();
  });
});
