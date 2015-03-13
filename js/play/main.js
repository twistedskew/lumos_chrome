define(['lumos/storage'], function (Storage) {
  var list = Storage.list()._wrapped;

  if (Storage.isEmpty()) {
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  } else {
    var src = 'http://lumosity.com/app/v4/games/' + Storage.randomSlug() + '?source=lumosity-break';
    $('#innerdiv').attr('src', src);
  }

  chrome.management.getAll(function(extensions) {
    var custom = _(extensions).filter(function (ext) {
      return ext.type === 'extension';
    });

    custom.map(function (ext) {
      console.log(ext.name);
      console.log(ext.type);
      console.log(ext.launchType);
      console.log(ext.homepageUrl);
      console.log(ext.permissions);
      console.log(ext.optionsUrl);
      console.log('------------');
    });
  });
});
