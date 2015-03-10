// Wrapper around localStorage.
//
// Adds data serialization, read/write and caching.
//
lumos.Storage = function (access_key) {
  // Basic Read/write
  function read ()  { return localStorage[access_key]; }
  function write (value) {
    localStorage[access_key] = value;
    cache.clear();
  }
  function isEmpty () { return _.isUndefined(read()); }
  function reset () {
    localStorage.removeItem(access_key); // Clean localStorage
    cache.clear();
  }

  // Serialization
  function serialize (object) { return JSON.stringify(object); }
  function deserialize (object) { return JSON.parse(object); }

  // Caching
  var cache = (function () {
    var cached = null;

    function cache (toBeCached) {
      return cached || (cached = toBeCached());
    }

    cache.clear = function () {
      cached = null;
    };

    return cache;
  })();

  //
  // Public API
  //
  function list () {
    return _(cache(function () { return deserialize(read()); }));
  }

  function setupData (object) {
    write(serialize(object));
  }

  // Inserts 1 item
  function insert (object) {
    var data = list();
    data.push(object);
    write(serialize(data));
  }

  function remove (object) {
    var data = list().reject(function (datum) {
      return datum == object;
    });
    write(serialize(data));
  }

  function update (updateInformation) {
    switch (updateInformation.op) {
      case 'select':
        insert(updateInformation.value);
        break;

      case 'deselect':
        remove(updateInformation.value);
        break;

      default:
        throw 'Unrecognized operation';
    }
  }

  // Boot the repository by adding all games by slug.
  if (isEmpty())
    setupData(lumos.Repository.all('slug'));

  return {
    update: update,
    contains: function (object) {
      return list().contains(object);
    }
  };
};

$(function (){
  var Games = new lumos.Storage('selectedGames');

  // Build buttons for popup.
  lumos.Repository.byPair(function (slug, name) {
    var $input = $('<input/>', { type: 'checkbox', id: slug }).addClass('game-name'),
        $label = $('<label/>', { for: slug }).text(name);

    if (Games.contains(slug))
      $input.prop('checked', true);

    $('#games-list').append($input, $label);
  });

  // Event handling for button clicking.
  $('.game-name').button().
    on('click', function(e) {
      var $target  = $(e.target),
          gameSlug = $(e.target).attr('id'),
          operation = $target.prop('checked') ? 'select' : 'deselect';

      Games.update({ value: gameSlug, op: operation });
    });
});
