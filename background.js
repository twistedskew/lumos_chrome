token_key = 'oauth_token';
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

function logoutLumosUser(){
  console.log('logging out');
  clearToken();
  window.close();
}
/*
$.ajax({
  type: "POST",
  url: "https://staging-6.lumosity.com/api/oauth/token?grant_type=password&client_id=3zh64m4ddakh9t4jhoz1ttfvl&client_secret=ehh6yflu22l0lx9bewbvo3bxu&username=test111@example.com&password=test1",
  success: function(data) {
    setToken(data.access_token);
    setUserInfo();
  }
});*/

function login(){
  $.ajax({
    type: "POST",
    url: "https://staging-6.lumosity.com/api/oauth/token?grant_type=password&client_id=3zh64m4ddakh9t4jhoz1ttfvl&client_secret=ehh6yflu22l0lx9bewbvo3bxu&username=test111@example.com&password=test1",
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
      user = data.user;
    }
  });
}

$( document ).ready(function() {
  $('.logout').click(function() {
    logoutLumosUser();
  });
  $('#login').click(function() {
    login();
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
