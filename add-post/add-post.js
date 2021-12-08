'use strict';
const url = 'http://localhost:3000'; //TODO: change url to server

// select existing html elements
const addForm = document.querySelector('#addPostForm');


// submit add post form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  
  console.log(fetchOptions);
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'add-post.html';
});

const validationAddPost = () => {

  document.write("Post has been created successfully");

};