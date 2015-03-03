window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

function updateMenu (updateInformation) {
  var selectedGames = JSON.parse(localStorage.checked)
    , value = updateInformation.value;

  switch (updateInformation.op) {
    case 'add':
      selectedGames.push(value)
      break;
    case 'remove':
      selectedGames = _(selectedGames).without(value)
      break;
    default:
      throw 'Unrecognized operation'
  }
  localStorage.checked = JSON.stringify(selectedGames);
}

var checked_games;

$(function (){
  var $button = $('#schedule')
    , $time   = $('#time');

  if (_.isUndefined(localStorage.checked))
    localStorage.checked = JSON.stringify(lumos.Repository.all('slug'));

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

  $( ".game-name" ).button().
    on('click', function(e) {
      var $target  = $(e.target)
        , gameSlug = $(e.target).attr('id')
        , operation = $target.prop('checked') ? 'add' : 'remove';

      updateMenu({ value: gameSlug, op: operation });
    });
});
