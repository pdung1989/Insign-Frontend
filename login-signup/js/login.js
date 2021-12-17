'use strict';
const url = 'https://10.114.32.129/app'; // change url when uploading to a different server

// select existing html elements
const loginForm = document.querySelector('#logInForm');
const signUpButton = document.getElementById("signUpBtn");
const signInButton = document.getElementById("signInBtn");
const container = document.getElementById("container");

// log in and sign up btn event listener
signUpButton.addEventListener("click", () => {
  container.classList.add("panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("panel-active");
});

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
 
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = '../news-feed/feed.html';
  }
});

