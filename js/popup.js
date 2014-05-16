$(function (){
  var $agency = $('#agency');

  $agency.on('change', function () {
    var value = $agency.find(':selected').val();
    chrome.runtime.sendMessage('Ok, Well take care of: ' + value);
  });
});
