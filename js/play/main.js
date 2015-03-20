define(function (require) {
  var Games = require('lumos/game-selection'),
      Freq = require('lumos/freq');

  if (window.location.hash === '')
    Freq.runExperiment(); // Here is the redirection to google happens

  if (Games.isEmpty()) {
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  } else {
    var src = 'http://lumosity.com/app/v4/games/' + Games.getRandom() + '?source=lumosity-break';
    $('#innerdiv').attr('src', src);
  }
});
