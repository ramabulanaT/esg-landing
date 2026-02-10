/**
 * ESG Navigator — API Client
 * Attaches JWT to all API calls.
 * Redirects to login on 401.
 */
var API_BASE = 'https://intellimat-repository-production-199f.up.railway.app';

async function apiCall(endpoint, options) {
  options = options || {};
  var token = sessionStorage.getItem('esg_token');

  var headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  var response = await fetch(API_BASE + endpoint, Object.assign({}, options, { headers: headers }));

  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/login.html';
    return null;
  }

  return response;
}

function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem('esg_user'));
  } catch (e) {
    return null;
  }
}

function logout() {
  sessionStorage.removeItem('esg_token');
  sessionStorage.removeItem('esg_user');
  window.location.href = '/login.html';
}
