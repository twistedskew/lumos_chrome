define(function (require) {
  module ('Games', {
    afterEach: function() {
      Selection.clean();
    }
  });

  Selection = require('lumos/game-selection');

  test('attributes', function() {
    equal(Selection.access_key, 'selectedGames', 'SelectedGames is the default access key');
  });

  var collection = ['a', 'b'];
  function initSelection () {
    Selection.insert(collection);
  }

  test('initialization', function() {
    ok(Selection.isEmpty(), 'is empty by default');

    initSelection();
    deepEqual(Selection.get(collection), collection, 'Starts off with an array');
  });

  test('selection/deselection', function() {
    initSelection();

    Selection.deselect('a');
    deepEqual(Selection.get(), ['b'], 'Deselects a');

    Selection.select('a');
    deepEqual(Selection.get(), ['b', 'a'], 'Selects a');
  });

  test('random pick', function() {
    initSelection();

    ok(_.contains(collection, Selection.getRandom()), 'Returns a random object from the collection');
  });
});
