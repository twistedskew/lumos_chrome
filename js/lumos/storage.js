define(function () {
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
    read: function () {
      return localStorage[this.access_key];
    },

    write: function (value) {
      localStorage[this.access_key] = value;
    },

    insert: function (object) {
      this.write(serialize(object));
    },

    get: function () {
      return deserialize(this.read());
    },

    clean: function () {
      localStorage.removeItem(this.access_key);
    }
  };

  return Storage;
});
