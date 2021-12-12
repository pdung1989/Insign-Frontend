"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

// get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

const createPostCard = (posts) => {
  const feed = document.querySelector(".main-feed");

  //TODO - add author + img + username href, author profile photo, like and comment count
  posts.forEach((post) => {
      feed.innerHTML += `<div class="single-post">
          <div class="post-title">
            <p class="title"><a href="../post-details/post-details.html?id=${post.post_id}">${post.title}</a></p>
          </div>
          <div class="author">
            <a href="../userpage/userpage.html?">
              <img src="data:image/jpeg;base64,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">
            </a>
            <div class="author-details">
              <a class="username" href="#">${post.author}</a>
            </div>
          </div>
          <div class="post-photo">
            <a href="../post-details/post-details.html?id=${post.post_id}">
              <img src="${url + '/uploads/' + post.image}" alt="post image">
            </a>
          </div>
          <div class="post-details">
            <div class="post-stats">
              <div class="post-likes">
                <img class="unliked">
                <p>12</p>
              </div>
              <div class="post-comments">
                <img src="../assets/comment-icon.svg">
                <p>10</p>
              </div>
            </div>
          </div>
        </div>`
  });
};

const createProfessionalPosts = (professionalPosts) => {
  const professionalPostsDiv = document.querySelector(".pro-feed");

  professionalPostsDiv.innerHTML += `<div class="pro-post one">
            <a href="../post-details/post-details.html?id=${professionalPosts[0].post_id}">
              <img src="${url + '/uploads/' + professionalPosts[0].image}">
            </a>
            <a href="../post-details/post-details.html?id=${professionalPosts[0].post_id}">
                <p class="pro-title">${professionalPosts[0].title}</p>
            </a>
          </div>
          <div class="pro-post two">
            <a href="../post-details/post-details.html?id=${professionalPosts[1].post_id}">
                <img src="${url + '/uploads/' + professionalPosts[1].image}">
            </a>
            <a href="../post-details/post-details.html?id=${professionalPosts[1].post_id}">
                <p class="pro-title">${professionalPosts[1].title}</p>
            </a>
            
          </div>`
};

// AJAX calls
const getPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post?limit=10", fetchOptions);
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
