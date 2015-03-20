define(function (require) {
  var Storage = require('lumos/storage'),
      Experiment = require('lumos/experiment');

  var Frequencies = {
    'relaxed':  { oneIn: 6 },
    'balanced': { oneIn: 2 },
    'intense':  { oneIn: 1 }
  };

  var Frequency = new Storage('trainingFrequency');

  function getSampleSize () {
    return Frequencies[Frequency.get()].oneIn;
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

      if (Frequency.get() === freq)
        optionTag.prop('selected', true);

      optionTag.text(capitalize(freq)).appendTo($select);
    }

    $select.on('change', function(e) {
      var option = $(e.target).find(':selected');
      Frequency.insert(option.attr('name'));
    });

    $(targetId).
      text("Frequency: ").
      append($select);
  }

  return {
    buildSelectTag: buildSelectTag,
    runExperiment: function() {
      Experiment(getSampleSize());
    }
  };
});
