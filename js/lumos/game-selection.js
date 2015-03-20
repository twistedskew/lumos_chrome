define(['lumos/storage'], function (Storage) {
  var Games = new Storage('selectedGames');

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
