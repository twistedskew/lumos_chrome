// Lumosity chrome extension
//
// Authors: Alan Andrade, Brian Ko, Abhishek Gupta.

var lumos = {};

(function (root) {
  // Since lots of the API expect callbacks, we created this empty function
  // so that is easier to type.
  root.noop = function () {};

  // Remainder
  //
  // This is the badge that will show up in the logo every X amount of time.
  // Right now we do it every 12 hours.
  var Remainder = root.Remainder = {
    // id
    //
    // Will be used for any alarm or notification.
    id: 'remainder',

    // everyHours
    //
    // How often do we want to remind our users.
    everyHours: 12,

    // text
    //
    // String to be used in the badge
    text: '1',

    // color
    //
    // badge color
    color: '#000',

    // .restart
    //
    // Will clear the badge and restart the countdown.
    restart: function () {
      chrome.alarms.create(this.id, {
        when: +moment().add('hours', this.everyHours)
      });

      chrome.browserAction.setBadgeText({text: ''});
    },

    // .start
    //
    // setup the badge and time
    start: function () {
      chrome.alarms.create(this.id, {
        when: +moment().add('days', 1)
      });
      this.show();
    },

    // show
    //
    // Show the badge
    show: function () {
      chrome.browserAction.setBadgeText({ text: this.text });
      chrome.browserAction.setBadgeBackgroundColor({ color: this.color });
    }
  };

  // Notification
  //
  // This is the notification that will pop up telling the user that there's a
  // workout ready for him.
  var Notification = root.Notification =  {
    id: 'notification',

    // .start
    //
    // Startup code
    start: function () {
      chrome.alarms.create(this.id, {
        when: +moment().add('hours', 1)
      });
    },

    // show
    //
    // Show the notification.
    show: function () {
      // We clear previous notifications to be sure the `create` call
      // opens up the new window, otherwise, i'd just swallow the method
      // call.
      chrome.notifications.clear(this.id, root.noop);

      chrome.notifications.create(this.id, {
        type:     'basic',
        title:    'Lumosity',
        message:  'Its time for your Lumosity Break!',
        iconUrl:  '../brain_76x76.png',
        buttons: [
          {title: 'Snooze [1 min]'},
          {title: 'Snooze [1 hour]'}
        ]
      }, root.noop);
    },

    // set
    //
    // setup the time where it should show up next.
    set: function (time) {
      var now   = moment(),
          self  = this;

      if (time < now) // We assume the user is referring to tomorrow's time.
        time = +moment(time).add('day', 1);

      chrome.alarms.clear(this.id, function () {
        chrome.alarms.create(self.id, {
          when: time
        });
      });
    }

  };

  // boot
  //
  // Operations made right when the extension is installed.
  root.boot = function () {
    Remainder.start();
    Notification.start();
  };


  root.next_url = function () {
    var randy = Math.ceil(Math.random() * 10) % 2;
    return randy > 0 ? 'http://www.lumosity.com' : 'http://www.google.com/ig'
  };
})(lumos);

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.update(tab.id, { url: lumos.next_url() });
});

//chrome.runtime.onInstalled.addListener(lumos.boot);

//// This will be triggered when the popup receives input from the user.
//chrome.runtime.onMessage.addListener(function (time) {
  //lumos.Notification.set(time);
  //lumos.Remainder.restart();
//});

//// This code will execute when an alarm is up.
//chrome.alarms.onAlarm.addListener(function(alarm) {
  //switch (alarm.name) {
    //case lumos.Notification.id:
      //lumos.Notification.show();
      //lumos.Remainder.restart();
      //break;

    //case lumos.Remainder.id:
      //lumos.Remainder.show();
      //break;
  //}
//});

//// When the user clicks the snooze buttons in the notification popup
//chrome.notifications.onButtonClicked.addListener(function (id, index) {
  //switch (index) {
    //case 0: // 1 min
      //lumos.Notification.set(+moment().add('minutes', 1));
      //break;
    //case 1: // 1 hour
      //lumos.Notification.set(+moment().add('hours', 1));
      //break;
  //}
//});

//// When the user clicks the notification big area, not buttons.
//chrome.notifications.onClicked.addListener(function (){
  //chrome.tabs.create({
    //url: chrome.extension.getURL('html/game_play.html')
  //});
//});
