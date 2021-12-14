'use strict';
const url = 'https://localhost:3000'; // change url when uploading to server

const signOut = (async () => {
  try {
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    alert('You have logged out');
    location.href = '../home/home.html';
  } catch (e) {
    console.log(e.message);
  }
})();
