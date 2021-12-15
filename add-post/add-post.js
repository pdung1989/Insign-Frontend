'use strict';
const url = 'http://10.114.32.129/app'; // change url when uploading to a different server

const styleList = document.querySelector('.add-style');
const categoryList = document.querySelector('.add-category');
const addPostForm = document.querySelector('#addPostForm');

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

//Create style options to <select>
const createStyleOptions = (styles) => {
    styles.forEach((style) => {
        styleList.innerHTML += `<option value="${style.style_id}">${style.style_name}</option>`;
    });
};

//Get styles to form options
const getStyles = async () => {
    try {
      const fetchOptions = {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
      };
      const response = await fetch(url + '/style', fetchOptions);
      const styles = await response.json();
      createStyleOptions(styles);
    } catch (e) {
      console.log(e.message);
    }
};

//Create category options to <select>
const createCategoryOptions = (categories) => {
  categories.forEach((category) => {
    categoryList.innerHTML += `<option value="${category.category_id}">${category.category_name}</option>`;
  });
};

//Get categories to form options
const getCategories = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + '/category', fetchOptions);
    const categories = await response.json();
    console.log(categories);
    createCategoryOptions(categories);
  } catch (e) {
    console.log(e.message);
  }
};

getStyles();
getCategories();

//Show photo when user uploads or replaces it
const imgInp = document.querySelector('#imgInp');
const showImg = document.querySelector('#show-img');
imgInp.onchange = () => {
    const [file] = imgInp.files;
    if (file) {
        showImg.src = URL.createObjectURL(file);
    }
};

//Submit add post form
addPostForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addPostForm);
  try {
      const fetchOptions = {
          method: 'POST',
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: fd,
      };
      const response = await fetch(url + '/post', fetchOptions);
      const json = await response.json();
      alert('Post uploaded successfully!');
      location.href = `../userpage/userpage.html?id=${user.user_id}`;
  } catch(e) {
      console.log(e);
  }
});
