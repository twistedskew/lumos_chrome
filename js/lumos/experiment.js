// Lumosity chrome extension
//
// Authors: Alan Andrade, Brian Ko, Abhishek Gupta.

define(function () {
  function isOneInRandom (max) {
    return 1 == _.random(1, max);
  }

  function run (sampleSize) {
    var trialNo  = 0,
        redirect = true;

    while (trialNo <= sampleSize) {
      trialNo++;

      if (isOneInRandom(sampleSize)) {
        redirect = false;
        return;
      }
    }

    // Refactor
    if (redirect)
      window.location.href = 'http://google.com/ig';
  }

  return run;
});
