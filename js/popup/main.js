define(
  ['lumos/repository', 'lumos/storage', 'lumos/freq'],
  function (Repository, Storage, Freq) {

  // Build buttons for popup.
  Repository.byPair(function (slug, name) {
    var $input = $('<input/>', { type: 'checkbox', id: slug }).addClass('game-name'),
        $label = $('<label/>', { for: slug }).text(name);

    if (Storage.contains(slug))
      $input.prop('checked', true);

    $('#games-list').append($input, $label);
  });

  // Event handling for button clicking.
  $('.game-name').button().on('click', function(e) {
    var $target  = $(e.target),
        gameSlug = $(e.target).attr('id'),
        operation = $target.prop('checked') ? 'select' : 'deselect';

    Storage.update({ value: gameSlug, op: operation });
  });

  Freq.buildSelectTag('#training-frequency');
});
