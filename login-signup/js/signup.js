
'use strict';
const url = "http://localhost:3000"; // change url when uploading to server

// select existing html elements
const signupForm = document.querySelector('#signUpForm');

signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(signupForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  
  console.log(json);
  if (json.token && json.user) {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = '../explore-page/explore.html';
    return;
  }

  if (json.length > 0) {
    let errors = '';
    json.forEach((err) => (errors += `${err.msg}\n`));
    alert(errors);
    return false;
  }

  alert(json.message);
  return false;
});


