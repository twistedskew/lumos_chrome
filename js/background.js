games = [
  'brain-shift-2',
  'brain-shift-overdrive-2',
  'chalkboard-challenge-2',
  'color-match-2',
  'ebb-and-flow',
  'follow-that-frog',
  'lost-in-migration-2',
  'memory-matrix-2',
  'penguin-pursuit',
  'pet-detective',
  'pinball-recall',
  'raindrops',
  'robot-factory',
  'spatial-speed-match-2',
  'speed-pack',
  'speed-match-2',
  'speed-match-overdrive',
  'star-search',
  'train-of-thought',
  'tidal-treasures',
  'trouble-brewing'
];

games2 = [
  {
    slug: 'brain-shift-2',
    name: 'Brain Shift'
  },
  {
    slug: 'brain-shift-overdrive-2',
    name: 'Brain Shift Overdrive'
  },
  {
    slug: 'chalkboard-challenge-2',
    name: 'Chalkboard Challenge'
  },
  {
    slug: 'color-match-2',
    name: 'Color Match'
  },
  {
    slug: 'ebb-and-flow',
    name: 'Ebb and Flow'
  },
  {
    slug: 'follow-that-frog',
    name: 'Follow that Frog'
  },
  {
    slug: 'lost-in-migration-2',
    name: 'Lost in Migration'
  },
  {
    slug: 'memory-matrix-2',
    name: 'Memory Matrix'
  },
  {
    slug: 'penguin-pursuit',
    name: 'Penguin Pursuit'
  },
  {
    slug: 'pet-detective',
    name: 'Pet Detective'
  },
  {
    slug: 'pinball-recall',
    name: 'Pinball Recall'
  },
  {
    slug: 'raindrops',
    name: 'Raindrops'
  },
  {
    slug: 'robot-factory',
    name: 'Robot Factory'
  },
  {
    slug: 'spatial-speed-match-2',
    name: 'Spatial Speed Match'
  },
  {
    slug: 'speed-pack',
    name: 'Speed Pack'
  },
  {
    slug: 'speed-match-overdrive',
    name: 'Speed Match Overdrive'
  },
  {
    slug: 'star-search',
    name: 'Star Search'
  },
  {
    slug: 'train-of-thought',
    name: 'Train of Thought'
  },
  {
    slug: 'tidal-treasures',
    name: 'Tidal Treasures'
  },
  {
    slug: 'trouble-brewing',
    name: 'Trouble Brewing'
  }
];

token_key = 'oauth_token';
user_key = 'lumos_user';
var user;

function setToken(token){
  localStorage[token_key] = token;
}

function getToken(){
  return localStorage[token_key];
}

function clearToken(){
  delete localStorage[token_key];
}

function hasToken(){
  return !!getToken();
}

function setUser(user){
  localStorage[user_key] = JSON.stringify(user);
  user = user;
}

function getUser(){
  if (localStorage[user_key]) {
    return JSON.parse(localStorage[user_key]);
  }
  else {
    return {};
  }
}

function logoutLumosUser(){
  console.log('logging out');
  clearToken();
  window.close();
}

function login(username, pasword){
  $.ajax({
    type: "POST",
    url: "https://staging-6.lumosity.com/api/oauth/token",
    data: {
      grant_type: "password",
      client_id: "3zh64m4ddakh9t4jhoz1ttfvl",
      client_secret: "ehh6yflu22l0lx9bewbvo3bxu",
      username: username,
      password: password
    },
    success: function(data) {
      setToken(data.access_token);
      setUserInfo();
    },
    error: function(data) {
      $('.alerts').show();
    }
  });
}

function setUserInfo() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "OAuth "+getToken()+"");
      xhr.setRequestHeader("Accept", "application/json; application/vnd.lumoslabs.com; version=v2");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    url: 'https://staging-6.lumosity.com/api/user',
    success: function(data) {
      user = data.user;
      setUser(data.user);
      window.close();
    }
  });
}

function addGameResult(score, game_id){
  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      game_result: {
        score: score,
        game_id: game_id
      }
    }),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "OAuth "+getToken()+"");
      xhr.setRequestHeader("Accept", "application/json; application/vnd.lumoslabs.com; version=v2");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    url: 'https://staging-6.lumosity.com/api/v2/game_results',
    success: function(data) {
      console.log(data);
    }
  });
}

function doLogin(){
  username = $('#user_email').val();
  password = $('#user_password').val();
  login(username, password);
}

$( document ).ready(function() {
  $('.logout').click(function() {
    logoutLumosUser();
  });
  $('#user_login').click(function() {
    doLogin();
  });
  $('#user_password').keypress(function(e) {
    if(e.which == 13) {
      doLogin();
    }
  });
});

if (this.hasToken()) {
  //callback(this.getToken(), this.getTokenSecret());
} else {
  /*window.chromeExOAuthOnAuthorize = function(token, secret) {
    callback(token, secret);
  };*/
  //chrome.tabs.create({ 'url' : 'login.html' });
}
