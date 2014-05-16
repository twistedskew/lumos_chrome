// Lumosity

K = function (){};

chrome.runtime.onMessage.addListener(function (message, sender) {
  chrome.alarms.clearAll();
  chrome.alarms.create({when: message});
  //chrome.alarms.create({when: Date.now()});
});

chrome.alarms.onAlarm.addListener(function(alarm) {

  chrome.notifications.clear('train', K);
  chrome.notifications.create('train', {
    type:     'basic',
    title:    'Lumosity',
    message:  'Its time to train \\o/',
    iconUrl:  '../brain_76x76.png',
    buttons: [
      {title: 'in 5 secs'},
      {title: 'in 10 secs'}
    ]
  }, K);
});

chrome.notifications.onButtonClicked.addListener(function (id, index) {
  switch (index) {
    case 0:  // 5 secs
      chrome.alarms.create({when: Date.now() + 5000});
      break;
    case 1:
      chrome.alarms.create({when: Date.now() + 10000});
      break;
  }
});

chrome.notifications.onClicked.addListener(function (){
  chrome.tabs.create({
    url: chrome.extension.getURL('html/background.html')
  });
});
