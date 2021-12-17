'use strict';

const url = 'https://10.114.32.129/app'; // change url when uploading to a different server

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

//Create cards for all posts
const createPostCard = (posts) => {
  const feed = document.querySelector(".main-feed");

  if(posts.length === 0){
    feed.innerHTML += `<div id="empty-feed" class="single-post">
          <p>Your feed is empty. <br> Click the button below to browse our explore page and follow some people</p>
          <a class="browse-button" href="../explore-page/explore.html">Browse posts ></a>
        </div>`;
  }

  posts.forEach((post) => {

      let isLiked = 'unliked';
      if(post.self_like === 1) {
        isLiked = 'liked';
      }

      feed.innerHTML += `<div class="single-post">
          <div class="post-title">
            <p class="title"><a href="../post-details/post-details.html?id=${post.post_id}">${post.title}</a></p>
          </div>
          <div class="author">
            <a href="../userpage/userpage.html?id=${post.author}">
              <img src="${url + '/uploads/' + post.profile_picture}" alt="${post.username}'s profile picture">
            </a>
            <div class="author-details">
              <a class="username" href="../userpage/userpage.html?id=${post.author}">${post.username}</a>
              <img id="isVerified${post.post_id}" alt="verified">
            </div>
          </div>
          <div class="post-photo">
            <a href="../post-details/post-details.html?id=${post.post_id}">
              <img src="${url + '/uploads/' + post.image}" alt="${post.title}">
            </a>
          </div>
          <div class="post-details">
            <div class="post-stats">
              <div class="post-likes">
                <img class="${isLiked}" alt="like-button" src="">
                <p>${post.num_likes}</p>
              </div>
              <div class="post-comments">
                <img src="../assets/comment-icon.svg" alt="comment-button">
                <p>${post.num_comments}</p>
              </div>
            </div>
          </div>
        </div>`;

      const userDiv = document.querySelector(`#isVerified${post.post_id}`);
      if(post.role_id === 2){
        userDiv.setAttribute('src', '../assets/green-checkmark.svg');
      } else{
        userDiv.remove();
      }
  });
};

//Create cards for posts to show on the side (desktop view only)
const createProfessionalPosts = (professionalPosts) => {
  const professionalPostsDiv = document.querySelector(".pro-feed");

  professionalPostsDiv.innerHTML += `<div class="pro-post one">
            <a href="../post-details/post-details.html?id=${professionalPosts[0].post_id}">
              <img src="${url + '/uploads/' + professionalPosts[0].image}" alt="${professionalPosts[0].title}">
            </a>
            <a href="../post-details/post-details.html?id=${professionalPosts[0].post_id}">
                <p class="pro-title">${professionalPosts[0].title}</p>
            </a>
          </div>
          <div class="pro-post two">
            <a href="../post-details/post-details.html?id=${professionalPosts[1].post_id}">
                <img src="${url + '/uploads/' + professionalPosts[1].image}" alt="${professionalPosts[1].title}">
            </a>
            <a href="../post-details/post-details.html?id=${professionalPosts[1].post_id}">
                <p class="pro-title">${professionalPosts[1].title}</p>
            </a>
          </div>`;
};

// AJAX calls
const getPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/user/feed", fetchOptions);
    const posts = await response.json();
    createPostCard(posts);

    const professionalPostResponse = await fetch(url + "/post/professional", fetchOptions);
    const professionalPosts = await professionalPostResponse.json();
    createProfessionalPosts(professionalPosts);
  } catch (e) {
    console.log(e.message);
  }
};

getPosts();
