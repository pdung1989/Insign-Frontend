'use strict';
const url = 'http://localhost:3000'; 

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// select existing html elements
const addUserForm = document.querySelector('#addUserForm');

// submit registration form
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
  
	const response = await fetch(url + '/user', fetchOptions);
	const json = await response.json();
	alert(json.message);
	location.href = 'forms.html';
  });

/* log in and sign up btn event listener*/ 
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});