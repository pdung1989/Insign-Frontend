"use strict";
const url = "http://localhost:3000"; //TODO: change url to server

//Get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get(param));
  return urlParams.get(param);
};

// select existing html elements
const addForm = document.querySelector("#addPostForm");
const categoryList = document.querySelector(".category");
const styleList = document.querySelector(".style");

//create category options
const createCategoryOptions = (categories) => {
  // clear category list
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    // create options with DOM methods
    const option = document.createElement("option");
    option.value = category.category_id;
    option.innerHTML = category.category_name;
    option.classList.add("light-border");
    categoryList.appendChild(option);
  });
};

// get category to make options
const getCategories = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/category", options);
    const categories = await response.json();
    createCategoryOptions(categories);
  } catch (e) {
    console.log(e.message);
  }
};

//create style options
const createStyleOptions = (styles) => {
  // clear style list
  styleList.innerHTML = "";
  styles.forEach((style) => {
    // create options with DOM methods
    const option = document.createElement("option");
    option.value = style.style_id;
    option.innerHTML = style.style_name;
    option.classList.add("light-border");
    styleList.appendChild(option);
  });
};

// get style to make options
const getStyles = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/style", options);
    const styles = await response.json();
    createStyleOptions(styles);
  } catch (e) {
    console.log(e.message);
  }
};

// submit add post form
addForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: fd,
  };

  console.log(fetchOptions);
  const category_response = await fetch(url + "/category/" + category_id, fetchOptions);
  const json = await category_response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }

  const style_response = await fetch(url + "/style/" + style_id, fetchOptions);
  const json2 = await style_response.json();
  if (json2.error) {
    alert(json2.error.message);
  } else {
    alert(json2.message);
  }
  location.href = "add-post.html";
});

const validationAddPost = () => {
  document.write("Post has been created successfully");
};
getCategories();
getStyles();