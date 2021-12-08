'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const signUpButton = document.getElementById("signUpBtn");
const signInButton = document.getElementById("signInBtn");
const container = document.getElementById("container");
const submitRegistration = document.getElementById("submitRegistration")

/* log in and sign up btn event listener*/
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
submitRegistration.addEventListener("click", () => {
    const pw1 = document.getElementById("pw1").value;
    const pw2 = document.getElementById("pw2").value;
    //check empty confirm password field
    if (pw2 == "") {
      document.getElementById("message2").innerHTML =
        "**Enter the password please!";
      return false;
    }
    if (pw1 != pw2) {
      document.getElementById("message2").innerHTML = "Passwords do not match";
      return false;
    } else {
      document.write("SignUp form has been submitted successfully");
    }
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// select existing html elements
const loginForm = document.querySelector('#logInForm');
const addUserForm = document.querySelector('#signUpForm');

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
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'forms.html';
  }
});

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  alert(json.message);
});
// const validationSignUpForm = () => {
//     const pw1 = document.getElementById("pw1").value;
//     const pw2 = document.getElementById("pw2").value;
//     //check empty confirm password field
//     if (pw2 == "") {
//       document.getElementById("message2").innerHTML =
//         "**Enter the password please!";
//       return false;
//     }
//     if (pw1 != pw2) {
//       document.getElementById("message2").innerHTML = "Passwords do not match";
//       return false;
//     } else {
//       document.write("SignUp form has been submitted successfully");
//     }
//   };