token_key = 'oauth_token';

function setToken(token){
  localStorage[token_key] = token;
}

function getToken(){
  return localStorage[token_key];
}

function clearToken(){
  delete localStorage[token_key];
}

function logoutLumosUser(){
  clearToken();
  window.close();
}
