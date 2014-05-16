token_key = 'oauth_token';
user_key = 'lumos_user';

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
  localStorage[user_key] = user;
}

function getUser(){
  return localStorage[user_key];
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
      window.close();
    },
    error: function(data) {
      alert('Incorrect. Please try again');
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
      setUser(data.user);
    }
  });
}

$( document ).ready(function() {
  $('.logout').click(function() {
    logoutLumosUser();
  });
  $('#login').click(function() {
    username = $('input[name=email]').val()
    password = $('input[name=password]').val()
    login(username, password);
  })
});

if (this.hasToken()) {
  //callback(this.getToken(), this.getTokenSecret());
} else {
  /*window.chromeExOAuthOnAuthorize = function(token, secret) {
    callback(token, secret);
  };*/
  //chrome.tabs.create({ 'url' : 'login.html' });
}
