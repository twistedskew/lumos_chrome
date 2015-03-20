define(function (require) {
  var Storage = require('lumos/storage'),
      Repository = require('lumos/repository');

  var Games = new Storage('selectedGames', Repository.all('slug'));

  _.extend(Games, {
    isEmpty: function() {
      return (Games.read() === undefined) ? true : false;
    },

    deselect: function (object) {
      var ret = _.without(this.get(), object);
      this.insert(ret);
      return ret;
    },

    select: function (object) {
      var current = this.get();
      current.push(object);
      this.insert(current);
      return current;
    },

    getRandom: function () {
      var collection = this.get();
      var randomIndex = Math.floor(Math.random() * collection.length);
      return collection[randomIndex];
    }
  });

  return Games;
});
