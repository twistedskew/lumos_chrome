define(['lumos/storage'], function (Storage) {
  var Games = new Storage('selectedGames');

  _.extend(Games, {
    randomSlug: function () {
      var list = this.list();
      var randomIndex = Math.floor(Math.random() * list.size());
      return list._wrapped[randomIndex];
    },

    select:   function (slug) { this.insert(slug); },
    deselect: function (slug) { this.remove(slug); }
  });

  return Games;
});

