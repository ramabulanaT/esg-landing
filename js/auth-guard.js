/**
 * ESG Navigator — Auth Guard
 * Include this script on every protected page.
 * Redirects to login.html if no valid token exists.
 */
(function() {
  var token = sessionStorage.getItem('esg_token');
  
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  // Check token expiry
  try {
    var parts = token.split('.');
    var payload = JSON.parse(atob(parts[1]));
    if (payload.exp * 1000 < Date.now()) {
      sessionStorage.clear();
      window.location.href = '/login.html';
      return;
    }
  } catch (e) {
    sessionStorage.clear();
    window.location.href = '/login.html';
    return;
  }
})();
