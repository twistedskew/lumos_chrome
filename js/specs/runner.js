(function () {
  var specs = [
    './lumos/storageSpec.js',
    './lumos/gameSelectionSpec.js'
  ];

  require(specs, function() {
    QUnit.start();
  });
})();
