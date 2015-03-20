define(function (require) {
  var Repository = require('lumos/repository'),
      Games = require('lumos/game-selection'),
      Freq = require('lumos/freq');

  if (Games.isEmpty())
    Games.insert(Repository.all('slug'));

  // Build buttons for popup.
  Repository.byPair(function (slug, name) {
    var $input = $('<input/>', { type: 'checkbox', id: slug }).addClass('game-name'),
        $label = $('<label/>', { for: slug }).text(name);

    if (_.contains(Games.get(), slug))
      $input.prop('checked', true);

    $('#games-list').append($input, $label);
  });

  $('.game-name').button().on('click', function(e) {
    var $target  = $(e.target),
        gameSlug = $(e.target).attr('id');

    if ($target.prop('checked')) {
      Games.select(gameSlug);
    } else {
      Games.deselect(gameSlug);
    }
  });

  Freq.buildSelectTag('#training-frequency');
});
