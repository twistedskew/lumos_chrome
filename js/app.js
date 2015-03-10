// Lumosity chrome extension
//
// Authors: Alan Andrade, Brian Ko, Abhishek Gupta.

var lumos = (function () {
  var Frequencies = {
    'relaxed':  { oneIn: 6 },
    'balanced': { oneIn: 2 },
    'intense':  { oneIn: 1 }
  };

  var isOneInRandom = function (max) {
    return 1 == _.random(1, max);
  };

  function runTrialFor (frequency, callback) {
    var trialNo   = 1,
        trialsMax = Frequencies[frequency].oneIn;

    while (trialNo <= trialsMax) {
      trialNo++;

      if (isOneInRandom(trialsMax)) {
        callback();
        return;
      }
    }
  }


  return { runTrialFor: runTrialFor };
})();

// tabs onCreated
//chtrome.tabs.onCreated.addListener(function (tab) {
  //lumos.runTrialFor('balanced', function () {
    //chrome.tabs.update(tab.id, { url: 'http://www.google.com/ig' });
  //});
//});
