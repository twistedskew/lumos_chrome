define(['lumos/tfreq'], function (TFreq) {
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
      var optionTag = $('<option>', {
        name: freq,
        value: getSampleSize(freq)
      });

      if (TFreq.get() === freq)
        optionTag.prop('selected', true);

      optionTag.text(capitalize(freq)).appendTo($select);
    }

    $select.on('change', function(e) {
      var option = $(e.target).find(':selected');
      TFreq.insert(option.attr('name'));
    });

    $(targetId).
      text("Frequency: ").
      append($select);
  }

  return {
    buildSelectTag: buildSelectTag,
    getSampleSize: getSampleSize
  };
});
