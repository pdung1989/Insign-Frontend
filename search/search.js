"use strict";
const blogs = document.getElementById("blogs");
const searchedPost = document.getElementById("searched_posts_area");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const exploreText = document.querySelector("h1");
const notFoundText = document.getElementById("not-found");
/* Fetch post from data when search */
const getSearchPost = async (searchInput) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
     
    };
    const response = await fetch(
      url + "/post/search?title=" + searchInput,
      fetchOptions
    );
    const posts = await response.json();
    //create searched card
    createSearchCards(posts);
    search(posts);
  } catch (e) {
    console.log(`failed to fetch post ${e.message}`);
  }
};
getSearchPost(searchInput.value);

const createSearchCards = (post) => {
  const displaySearchedPost = document.createElement("div");
  displaySearchedPost.setAttribute("class", "foundPost");

  const row = document.createElement("div");
  row.setAttribute("class", "row");

  const a = document.createElement("a");
  a.setAttribute(
    "href",
    `../post-details/post-details.html?id=${post.post_id}`
  );

  const img = document.createElement("img");
  img.setAttribute("class", "searchImg");
  const title = document.createElement("h3");
  title.setAttribute("id", "searchTitle");
  // const description = document.createElement("p");
  // description.setAttribute("class", "postDesc");
  img.src = url + '/uploads/' + post.image;
  title.innerHTML = post.title;

  // description.innerHTML = post.description;

  a.appendChild(img);
  displaySearchedPost.appendChild(title);
  displaySearchedPost.appendChild(a);
  // displaySearchedPost.appendChild(description);
  row.appendChild(displaySearchedPost);

  searchedPost.appendChild(row);
};

const search = (search) => {
  whenEntered();
  searchBtn.addEventListener("click", () => {
    searchedPost.innerHTML = "";
    const userInput = document.getElementById("searchInput").value;
    let searchedPostArray = [];
    for (let i = 0; i < search.length; i++) {
      const postTitle = search[i].title.toLowerCase();
      if (postTitle.includes(userInput)) {
        exploreText.innerHTML = "Found posts";
        searchedPost.style.display = "flex";
        blogs.style.display = "none";
        createSearchCards(search[i]);
        searchedPostArray.push(search[i]);
      }
      if (searchedPostArray.length == 0) {
        blogs.style.display = "none";
        notFoundText.style.display = "block";
        notFoundText.innerHTML = "We found no post matches your search";
      } else {
        notFoundText.style.display = "none";
      }
    }
    searchInput.value = "";
  });
};

const whenEntered = () => {
  searchInput.addEventListener("change", async (evt) => {
    evt.preventDefault();
    searchedPost.innerHTML = "";
    searchBtn.click();
  });
};
