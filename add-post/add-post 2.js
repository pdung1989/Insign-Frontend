'use strict';
const url = 'http://localhost:3000'; //TODO: change url to server

// select existing html elements
const addForm = document.querySelector('#addCatForm');


// submit add post form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    body: fd,
  };
  console.log(fetchOptions);
  const response = await fetch(url + '/posts', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'add-post.html';
});
