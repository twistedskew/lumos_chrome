define(function () {
  var Frequencies = {
    'relaxed':  { oneIn: 6 },
    'balanced': { oneIn: 2 },
    'intense':  { oneIn: 1 }
  };

  function getSampleSize (frequency) {
    return Frequencies[frequency].oneIn;
  }

  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function buildSelectTag (targetId) {
    var $select = $('<select>');

    for (var freq in Frequencies) {
      $('<option>', {
        name: freq,
        value: getSampleSize(freq)
      }).text(capitalize(freq)).appendTo($select);
    }

    $(targetId).
      text("Frequency: ").
      append($select);
  }

  return {
    buildSelectTag: buildSelectTag,
    getSampleSize: getSampleSize
  };
});
