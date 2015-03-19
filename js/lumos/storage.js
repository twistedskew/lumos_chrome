define(function () {
  function read () {
    return localStorage[this.access_key];
  }

  function write (value) {
    localStorage[this.access_key] = value;
  }

  function serialize (object) {
    return JSON.stringify(object);
  }

  function deserialize (object) {
    return JSON.parse(object);
  }

  Storage = function (key) {
    this.access_key = key;
  };

  Storage.prototype = {
    read: read,
    write: write,

    insert: function (object) {
      write(serialize(object));
    },

    get: function () {
      return deserialize(read());
    },

    clean: function () {
      localStorage.removeItem(this.access_key);
    }
  };

  // Caching
  //var cache = (function () {
    //var cached = null;

    //function cache (toBeCached) {
      //return cached || (cached = toBeCached());
    //}

    //cache.clear = function () {
      //cached = null;
    //};

    //return cache;
  //})();

  return Storage;

  // What's different;
  //  1. access key
  //  2. serialization

  //
  // Public API
  //
  //function list () {
    //return _(cache(function () { return deserialize(read()); }));
  //}

  //function insert (object) {
    //write(serialize(data));
  //}

  //function remove (object) {
    //var data = list().reject(function (datum) {
      //return datum == object;
    //});
    //write(serialize(data));
  //}

  //function Storage (key) {
    //this.access_key = key;
  //}

  //_.extend(Storage.prototype, {
    //list: list,
    //insert: insert,
    //remove: remove,

    //contains: function (object) {
      //return list().contains(object);
    //},
    //isEmpty: function () {
      //return list().size() === 0;
    //},
  //});

  //return Storage;
});
