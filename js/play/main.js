define(['lumos/storage'], function (Storage) {
  var list = Storage.list()._wrapped;

  if (list.length){
    var randomIndex = Math.floor(Math.random() * list.length),
        src = 'http://lumosity.com/app/v4/games/' + list[randomIndex] + '?source=lumosity-break';

    $('#innerdiv').attr('src', src);
  }else{
    $('#outerdiv').append('<h3 style="color: #dd1144; background:#fff; padding:30px; width:620px; height:460px; border: 1px solid #e2e2e2;">Please put at least 1 game in your break by clicking on the Lumosity app icon!</h3>');
  }
});
