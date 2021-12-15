"use strict";
const url = "http://localhost:3000";

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

const createPostCard = (posts) => {
  const blogs = document.querySelector(".blogs");
  blogs.setAttribute("class", "blogs");
  const searchArea = document.getElementById("searched_posts_area");
  searchArea.style.display = 'none';
  posts.forEach((post) => {
   
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.setAttribute("href", `../post-details/post-details.html?id=${post.post_id}`);
    img.setAttribute("class","img");
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const column = document.createElement("div");
    column.setAttribute("class", "column");
    const h3 = document.createElement("h3");
    h3.setAttribute("id", "title");

    img.src = url + '/uploads/' + post.image;
    h3.innerHTML = post.title;


    a.appendChild(img);
    card.appendChild(h3);
    card.appendChild(a);
    column.appendChild(card);
    blogs.appendChild(column);
  });
};

const getRandomPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }
    const response = await fetch(url + "/post?limit=15", fetchOptions);
    const posts = await response.json();
    createPostCard(posts);
  } catch (e) {
    console.log(e.message);
  }
}
getRandomPosts();
