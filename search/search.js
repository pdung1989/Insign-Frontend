"use strict";
const blogs = document.getElementById("blogs");
const searchedPost = document.getElementById("searched_posts_area");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const exploreText = document.querySelector("h1");

/* Fetch post from data when search */
const getSearchPost = async (searchInput) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    let response = "";
    if (searchInput != "")
      response = await fetch(
        url + "/post/search?title=" + searchInput,
        fetchOptions
      );
    else response = await fetch(url + "/post", fetchOptions);

    const posts = await response.json();
    //create searched card
    createSearchCards(posts);
  } catch (e) {
    console.log(`failed to fetch post ${e.message}`);
  }
};

const createSearchCards = (posts) => {
  posts.forEach((post) => {
    const displaySearchedPost = document.createElement("div");
    const a = document.createElement("a");
    a.setAttribute("href", `../post-details/post-details.html?id=${post.post_id}`);

    const img = document.createElement("img");
    img.setAttribute("class", "searchImg");
    const title = document.createElement("h4");
    const description = document.createElement("p");

    img.src = post.image;
    title.innerHTML = post.title;
    console.log(`title: ${post.title}`);
    description.innerHTML = post.description;

    a.appendChild(img);
    displaySearchedPost.appendChild(a);
    displaySearchedPost.appendChild(title);
    displaySearchedPost.appendChild(description);

    searchedPost.appendChild(displaySearchedPost);
  });
  
};

//Function search for post(s)
const search = (post) => {
  whenEntered();
  searchBtn.addEventListener("click", () => {
   
    getSearchPost(searchInput.value);
    exploreText.innerHTML = "Found posts";
    searchedPost.style.display = "flex";
    blogs.style.display = "none";
  });
};
const whenEntered = () => {
  searchInput.addEventListener("change", async (evt) => {
    evt.preventDefault();
    getSearchPost(searchInput.value);
    exploreText.innerHTML = "Found posts";
    searchedPost.style.display = "flex";
    blogs.style.display = "none";
  });
};
search(searchInput.value);
