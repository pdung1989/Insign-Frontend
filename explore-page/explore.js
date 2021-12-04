"use strict";
const url = "http://localhost:3000";


//Get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get(param));
  return urlParams.get(param);
};

const createPostCard = (posts) => {
  const blogs = document.querySelector(".blogs");
  blogs.setAttribute("class", "blogs");

  posts.forEach((post) => {
    //generate a number and provide to the image to generate randomly
    //let number = Math.floor(Math.random() * posts.length);
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("height", 450);
    img.setAttribute("width", 400);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const column = document.createElement("div");
    column.setAttribute("class", "column");
    const h3 = document.createElement("h3");
    h3.setAttribute("id", "title");

    img.src = post.image;
    h3.innerHTML = post.title;

    console.log(`set img src: ${img.src}`);

    a.appendChild(img);
    card.appendChild(h3);
    card.appendChild(a);
    column.appendChild(card);
    blogs.appendChild(column);
  });
};

const getAllPosts = async () => {
  try {
    const response = await fetch(url + "/posts");
    const posts = await response.json();
    console.log(posts);
    createPostCard(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getAllPosts();

const getPost = async (postId) => {
  try {
    const response = await fetch(url + "/posts/" + postId );
    const posts = await response.json();
    console.log(posts);
    createPostCard(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost(getQParam('postId'));