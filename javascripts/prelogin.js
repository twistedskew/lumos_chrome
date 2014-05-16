$( document ).ready(function() {
  if (!hasToken()){
    window.location.href = "login.html";
  }
});
