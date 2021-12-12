"use strict";
const blogs = document.querySelector("blogs");
const searchedPost = document.getElementById("searchedPost");
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
  const displaySearchedPost = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h4");
  const description = document.createElement("p");

  img.src = post.image;
  title.innerHTML = post.title;
  description.innerHTML = post.description;

  displaySearchedPost.appendChild(img);
  displaySearchedPost.appendChild(title);
  displaySearchedPost.appendChild(description);

  searchedPost.appendChild(displaySearchedPost);

  displaySearchedPost.addEventListener("click", () => {
    location.href = `../post-details/post-details.html?id=${posts.post_id}`;
  });
};

//Function search for post(s)
const search = (post) => {
 
  whenEntered();
  searchBtn.addEventListener("click", () => {
    console.log("clicked search");
    searchedPost.innerHTML = "";
    const userInput = document.getElementById("searchInput").value;
    //create an empty post array
    let postArray = [];

    
    for (let i = 0; i < post.length; i++) {
      const postTitle = post[i].post.title.toLowerCase();
      if (postTitle.include(userInput)) {
        createSearchCards(post[i]);
        blogs.style.display = "none";
        exploreText.innerHTML = "Found posts";
        searchedPost.style.display = "flex";
        postArray.push(post[i]);
      }
    }
  });
};
const whenEntered = () => {
  searchInput.addEventListener("change", async (evt) => {
    evt.preventDefault();
    console.log(`Input search value: ${searchInput.value}`);
    getSearchPost(searchInput.value);
  });
};
search();