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
    img.setAttribute("class", "feed-img")
    
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

const createRandomPosts = (randomPosts) => {
  const randomPostsDiv = document.querySelector("#proPost");
  randomPostsDiv.setAttribute("class", "card");

  randomPosts.forEach((randomPost) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const title = document.createElement("h2");
    title.setAttribute("id", "title");
    const author = document.createElement("h5");
    author.setAttribute("id", "pro-user");
    const postImg = document.createElement("div");
    postImg.setAttribute("class", "postImg");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("class", "pro-img");

    const link = document.createElement("a");
    link.setAttribute("href", "See More")
    link.setAttribute("id", "toProPost");

    title.innerHTML = randomPost.title;
    img.src = randomPost.image;
    author.innerHTML = randomPost.author;
   
    console.log(`set random img src: ${img.src}`);
    
    //append elements
    postImg.appendChild(img);
    a.appendChild(postImg);
    card.appendChild(title);
    card.appendChild(a);
    card.appendChild(author);
    card.appendChild(postImg);
    card.appendChild(link);
    randomPostsDiv.appendChild(card);
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

    const randomPostResponse = await fetch(url + "/post?limit=2", fetchOptions);
    const randomPosts = await randomPostResponse.json();
    console.log("call random");
    createRandomPosts(randomPosts);
  } catch (e) {
    console.log(e.message);
  }
};
getPosts(getQParam());
