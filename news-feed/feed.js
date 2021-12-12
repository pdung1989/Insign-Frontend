"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

// get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

const createPostCard = (posts) => {
  //const feed = document.querySelector(".main-feed");

  posts.forEach((post) => {

  });
};

const createProfessionalPosts = (professionalPosts) => {
  //const professionalPostsDiv = document.querySelector(".pro-feed");

  professionalPosts.forEach((professionalPost) => {

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

    const professionalPostResponse = await fetch(url + "/post?limit=2", fetchOptions);
    const professionalPosts = await professionalPostResponse.json();
    console.log("call professional posts");
    createProfessionalPosts(professionalPosts);
  } catch (e) {
    console.log(e.message);
  }
};
getPosts();
