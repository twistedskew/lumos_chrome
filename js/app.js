// Lumosity
//
// Hackathon WIP and proof of concept.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.notifications.create('agency_change', {
      type: 'basic',
      title: 'Lumosity',
      message: request,
      iconUrl: '../brain_76x76.png'
    }, function(notif){
      setTimeout(function () {
        chrome.notifications.clear(notif, function () {});
      }, 2000);
    });
});
