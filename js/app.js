// Lumosity

K = function (){};

NOTIF     = 'train';
REMAINDER = 'daily_remainder';
ALARM     = 'scheduled_workout';
ONE_MIN   = 1000*60;
ONE_HOUR  = 1000*60*60*24;
ONE_DAY   = 1000*60*60*24;

function restartRemainder () {
  chrome.alarms.get(REMAINDER, function (alarm) {
    alarm.when = Date.now() + ONE_DAY;
    chrome.browserAction.setBadgeText({text: ''});
  });
}

chrome.alarms.create(REMAINDER, {
  when: Date.now() + ONE_DAY
});

chrome.alarms.create(ALARM, {
  when: Date.now() + ONE_HOUR
});

chrome.browserAction.setBadgeText({text: '1'});

chrome.runtime.onMessage.addListener(function (message, sender) {
  chrome.alarms.get(ALARM, function (alarm) {
    alarm.when = message;
    restartRemainder();
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.notifications.clear(NOTIF, K);
  chrome.notifications.create(NOTIF, {
    type:     'basic',
    title:    'Lumosity',
    message:  'Its time for your Lumosity Break!',
    iconUrl:  '../brain_76x76.png',
    buttons: [
      {title: 'Snooze [1 hour]'},
      {title: 'Snooze [3 hours]'}
    ]
  }, K);
  restartRemainder();
});

chrome.notifications.onButtonClicked.addListener(function (id, index) {
  switch (index) {
    case 0:  // 1 hour
      chrome.alarms.create({when: Date.now() + ONE_HOUR});
      break;
    case 1: // 3 hours
      chrome.alarms.create({when: Date.now() + ONE_HOUR*3});
      break;
  }
});

chrome.notifications.onClicked.addListener(function (){
  chrome.tabs.create({
    url: chrome.extension.getURL('html/background.html')
  });
});
