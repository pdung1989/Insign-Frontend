"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

// get user data
// const user = JSON.parse(sessionStorage.getItem("user"));

//Get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get(param));
  return urlParams.get(param);
};

const createPostCard = (posts) => {
  const blogs = document.querySelector(".leftcolumn");
  blogs.setAttribute("class", "leftcolumn");

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.setAttribute("class", "card");
    const title = document.createElement("h2");
    title.setAttribute("id", "title");
    const author = document.createElement("h5");
    author.setAttribute("class", "author");
    const a = document.createElement("a");
    const postImg = document.createElement("div");
    postImg.setAttribute("class", "postImg");
    const img = document.createElement("img");
    img.setAttribute("height", 450);
    img.setAttribute("width", 400);
    const postDescription = document.createElement("p");

    title.innerHTML = post.title;
    author.innerHTML = post.author;
    img.src = post.image;
    postDescription.innerHTML = post.description;

    console.log(`set img src: ${img.src}`);

    postImg.appendChild(img);
    a.appendChild(postImg);
    postDiv.appendChild(title);
    postDiv.appendChild(author);
    postDiv.appendChild(a);
    postDiv.appendChild(postDescription);
    blogs.appendChild(postDiv);
  });
};

// AJAX calls
const getPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post?limit=4", fetchOptions);
    const posts = await response.json();
    createPostCard(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPosts(getQParam());
