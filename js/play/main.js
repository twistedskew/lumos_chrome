define(
  ['lumos/game-selection', 'lumos/experiment', 'lumos/freq', 'lumos/tfreq'],
  function (Games, Experiment, Freq, TFreq) {

  if (window.location.hash === '') {
    var frequency = TFreq.get();
    Experiment(Freq.getSampleSize(frequency)); // Redirects to google if experiment is successful.
  }

  if (Games.isEmpty()) {
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  } else {
    var src = 'http://lumosity.com/app/v4/games/' + Games.getRandom() + '?source=lumosity-break';
    $('#innerdiv').attr('src', src);
  }
});
