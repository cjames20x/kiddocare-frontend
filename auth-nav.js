// Reflects the signed-in state across every page's navbar.
// This site has no backend/session, so "logged in" just lives in
// localStorage until a real auth system replaces it.
(function () {
  var KEY = 'kiddocareLoggedIn';

  function isLoggedIn() {
    return localStorage.getItem(KEY) === 'true';
  }

  function setLoggedIn(value) {
    if (value) localStorage.setItem(KEY, 'true');
    else localStorage.removeItem(KEY);
  }

  function renderNav() {
    var nav = document.querySelector('.nav-actions');
    if (!nav || !isLoggedIn()) return;
    nav.innerHTML =
      '<a href="index_loggedin.html" class="btn-outline">My Account</a>' +
      '<button type="button" class="btn-solid" id="logoutBtn">Log Out</button>';
    document.getElementById('logoutBtn').addEventListener('click', function () {
      setLoggedIn(false);
      location.href = 'home.html';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // A page can mark itself as reachable only when signed in, e.g. <body data-signed-in>.
    if (document.body.hasAttribute('data-signed-in')) setLoggedIn(true);
    renderNav();
  });
  window.KiddoCareAuth = { isLoggedIn: isLoggedIn, setLoggedIn: setLoggedIn };
})();