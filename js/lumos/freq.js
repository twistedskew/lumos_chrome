define(function (require) {
  var Storage = require('lumos/storage'),
      Experiment = require('lumos/experiment');

  var Frequencies = {
    'Every time I open a new tab': { oneIn: 1 },
    'Once every 5 new tabs': { oneIn: 5 },
    'Once every 10 new tabs': { oneIn: 10 },
    'Once every 15 new tabs': { oneIn: 15 },
    'Once every 20 new tabs': { oneIn: 20 },
    'Never': { oneIn: 0 }
  };

  defaultFrequency = Frequencies['Every time I open a new tab'].oneIn;

  var Frequency = new Storage('trainingFrequency', defaultFrequency);

  function buildSelectTag (targetId) {
    var $select = $('<select>');

    for (var freq in Frequencies) {
      var optionTag = $('<option>', {
        name: freq,
        value: Frequencies[freq].oneIn
      });

      if (Frequency.get() === freq)
        optionTag.prop('selected', true);

      optionTag.text(freq).appendTo($select);
    }

    $select.on('change', function(e) {
      var option = $(e.target).find(':selected');
      Frequency.insert(option.val());
    });

    $(targetId).append($select);
  }

  return {
    buildSelectTag: buildSelectTag,
    runExperiment: function() {
      Experiment(Frequency.get());
    }
  };
});
