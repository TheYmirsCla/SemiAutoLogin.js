(() => {
  var popupCenter = ({url, title, w, h}) => {
      var dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
  
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  
      var systemZoom = width / window.screen.availWidth;
      var left = (width - w) / 2 / systemZoom + dualScreenLeft;
      var top = (height - h) / 2 / systemZoom + dualScreenTop;
      var newWindow = window.open(url, title, 
        `
        scrollbars=yes,
        width=${w / systemZoom}, 
        height=${h / systemZoom}, 
        top=${top}, 
        left=${left}
        `
      );
  
      return newWindow;
  }

  ModAPI.require("player");
  var w = 200;
  var h = 200;
  var newWin = popupCenter({url: '', title: '', w: 200, h: 100});
  var pass = "";
  var loginKey = 38; // Default login key (Up arrow)

  if(!newWin || newWin.closed || typeof newWin.closed=='undefined') 
  { 
      pass = prompt("login (popup failed!)");
  } else {
    newWin.document.body.innerHTML="<center><form id='form'><input id='pass' type='password' autofocus/><br><br><input type='submit' value='Register'></form></center>";
    newWin.document.getElementById("form").onsubmit=function(){
        pass = newWin.document.getElementById("pass").value;
        newWin.close();
    };
  }

  function changeLoginKey(e) {
    if (e.shiftKey && e.key === '0') {
      newWin.document.body.innerHTML="<center><form id='keyForm'><input id='newKey' type='text' autofocus/><br><br><input type='submit' value='Set Key'></form></center>";
      newWin.document.getElementById("keyForm").onsubmit=function(){
        loginKey = newWin.document.getElementById("newKey").value;
        newWin.close();
      };
    }
  }

  function loginModFunc(e){
    if (e.key == loginKey) {
      ModAPI.player.sendChatMessage({message:"/login "+pass});
    }
  }

  ModAPI.addEventListener("key", changeLoginKey);
  ModAPI.addEventListener("key", loginModFunc);

  if (newWin) {
    newWin.document.getElementById("pass").focus();
  }

  function displayLoginMessage() {
    alert("Login successful!");
  }

  function closePopupOnEsc(e) {
    if (e.key === 'Escape') {
      newWin.close();
    }
  }

  function resetPassword(e) {
    if (e.ctrlKey && e.key === 'r') {
      newWin.document.body.innerHTML="<center><form id='resetForm'><input id='newPass' type='password' autofocus/><br><br><input type='submit' value='Reset Password'></form></center>";
      newWin.document.getElementById("resetForm").onsubmit=function(){
        pass = newWin.document.getElementById("newPass").value;
        newWin.close();
      };
    }
  }

  ModAPI.addEventListener("key", closePopupOnEsc);
  ModAPI.addEventListener("key", resetPassword);
})();
