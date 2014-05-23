// Lumosity

K = function (){};

NOTIF     = 'train';
REMAINDER = 'daily_remainder';
ALARM     = 'scheduled_workout';
ONE_MIN   = 1000*60;
ONE_HOUR  = 1000*60*60*24;
ONE_DAY   = 1000*60*60*24;

function restartRemainder () {
  chrome.alarms.create(REMAINDER, {when: Date.now() + ONE_DAY});
  chrome.browserAction.setBadgeText({text: ''});
}

chrome.alarms.create(REMAINDER, {
  when: Date.now() + ONE_DAY
});

chrome.alarms.create(ALARM, {
  when: Date.now() + ONE_HOUR
});

chrome.browserAction.setBadgeText({text: '1'});
chrome.browserAction.setBadgeBackgroundColor({color:'#000'}); 

chrome.runtime.onMessage.addListener(function (message, _sender) {
  chrome.alarms.clear(ALARM, function (_cleared) {
    chrome.alarms.create(ALARM, {when: message});
  });
  restartRemainder();
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  switch (alarm.name) {
    case ALARM:
      chrome.notifications.create(NOTIF, {
        type:     'basic',
        title:    'Lumosity',
        message:  'Its time for your Lumosity Break!',
        iconUrl:  '../brain_76x76.png',
        buttons: [
          {title: 'Snooze [1 min]'},
          {title: 'Snooze [1 hour]'}
        ]
      }, restartRemainder);
      break;

    case REMAINDER:
      chrome.browserAction.setBadgeText({text: '1'});
      chrome.browserAction.setBadgeBackgroundColor({color:'#000'}); 
      break;
  }
});

chrome.notifications.onButtonClicked.addListener(function (id, index) {
  switch (index) {
    case 0:  // 1 hour
      chrome.alarms.create(ALARM, {when: Date.now() + ONE_MIN});
      break;
    case 1: // 3 hours
      chrome.alarms.create(ALARM, {when: Date.now() + ONE_HOUR});
      break;
  }
});

chrome.notifications.onClicked.addListener(function (){
  chrome.tabs.create({
    url: chrome.extension.getURL('html/game_play.html')
  });
});
