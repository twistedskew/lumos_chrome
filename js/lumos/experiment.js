// Lumosity chrome extension
//
// Authors: Alan Andrade, Brian Ko, Abhishek Gupta.

define(function () {
  var isOneInRandom = function (max) {
    return 1 == _.random(1, max);
  };

  function run (sampleSize) {
    var trialNo   = 0;

    while (trialNo <= sampleSize) {
      trialNo++;

      if (isOneInRandom(sampleSize)) {
        // Refactor
        window.location.href = 'http://google.com/ig';
        return;
      }
    }
  }

  return run;
});
