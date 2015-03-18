define(
  ['lumos/storage', 'lumos/experiment', 'lumos/freq'],
  function (Storage, Experiment, Freq) {

  if (window.location.hash === '')
    Experiment(Freq.getSampleSize('relaxed')); // Redirects to google if experiment is successful.

  var list = Storage.list()._wrapped;

  if (Storage.isEmpty()) {
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  } else {
    var src = 'http://lumosity.com/app/v4/games/' + Storage.randomSlug() + '?source=lumosity-break';
    $('#innerdiv').attr('src', src);
  }
});
