// Lumosity chrome extension
//
// Authors: Alan Andrade, Brian Ko, Abhishek Gupta.

var lumos = {};

lumos.Frequencies = {
  'relaxed':  1/6,
  'balanced': 1/2,
  'intense':  1
}

lumos.openTabCounter = 0;

lumos.runTrial = function (callback) {
  lumos.openTabCounter++;

  var experiment = function () {
    Math.ceil(Math.random() * 10) % 2;
  }

  if (randy > 0)
    callback('http://www.google.com/ig')
}

// tabs onCreated
chrome.tabs.onCreated.addListener(function (tab) {
  lumos.runTrial(function (url) {
    chrome.tabs.update(tab.id, { url: url });
  });
  console.log(lumos.tabCreate);
});
