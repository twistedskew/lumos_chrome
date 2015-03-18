define(
  ['underscore', 'lumos/repository'],
  function (_, Repository) {
  // Wrapper around localStorage.

  var access_key;
  // Basic Read/write
  function read ()  { return localStorage[access_key]; }
  function write (value) {
    localStorage[access_key] = value;
    cache.clear();
  }
  function isFirstRun () { return _.isUndefined(read()); }
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

  // Boot the repository by adding all games by slug.
  if (isFirstRun())
    setupData(Repository.all('slug'));

  function Storage (key) {
    this.access_key = key;
  }

  _.extend(Storage.prototype, {
    list: list,
    insert: insert,
    remove: remove,

    contains: function (object) {
      return list().contains(object);
    },
    isEmpty: function () {
      return list().size() === 0;
    },
  });

  return Storage;
});
