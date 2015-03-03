window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

function updateMenu (updateInformation) {
  var selectedGames = lumos.Storage.getAll()
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

  lumos.Storage.insert(selectedGames);
}

lumos.Storage = (function (ls, accessor) {
  var get = function ()  { return ls[accessor] }
    , set = function (v) { ls[accessor] = v }

  // Boot with localStorage
  if (!_.isString(get()))
    insert(lumos.Repository.all('slug'))

  // Keep a cached version of the content to skip serialization.
  var cache = null
    , list  = function () { return cache || JSON.parse(get()) }
    , insert = function (object) {
        set(JSON.stringify(cache = object));
      };

  return {
    insert: insert,
    getAll: list
  }

})(localStorage, 'selectedGames');

$(function (){
  // Flaky Scheduling operations.
  //
  // var $button = $('#schedule')
  // , $time   = $('#time');
  // function schedule () {
  //   var time = moment($time.val(), 'HH:mm');
  //   if (time.isValid()) {
  //     localStorage.setItem('time', time);
  //     chrome.runtime.sendMessage(+time);
  //     window.close();
  //   } else {
	// 		$('#error').show();
	// 	}
  // }
  // $button.on('click', schedule);
  // $time.keypress(function (e) {
  //   if (e.which == 13) { schedule(); }
  // });

  lumos.Repository.byPair(function (slug, name) {
    var $input = $('<input/>', { type: 'checkbox', id: slug }).addClass('game-name')
      , $label = $('<label/>', { for: slug }).text(name);

    if (_(lumos.Storage.getAll()).contains(slug))
      $input.prop('checked', true);

    $('#games-list').append($input, $label);
  });

  $('.game-name').button().
    on('click', function(e) {
      var $target  = $(e.target)
        , gameSlug = $(e.target).attr('id')
        , operation = $target.prop('checked') ? 'add' : 'remove';

      updateMenu({ value: gameSlug, op: operation });
    });
});
