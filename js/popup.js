$(function (){
  var $button = $('#schedule'),
    $time = $('#time');

  function schedule () {
    var time = Date.parse($time.val());
    if (time) {
      localStorage.setItem('time', time);
      chrome.runtime.sendMessage(+time);
      window.close();
    } else {
      alert('Use the following format: hour:minutes:am/pm');
    }
  }

  $button.on('click', schedule);
  $time.keypress(function (e) {
    if (e.which == 13) { schedule(); }
  });
});
