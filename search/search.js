"use strict";
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("change", async (evt) => {
  console.log(`Input search value: ${searchInput.value}`);
  getPost(searchInput.value);
});

/* Fetch post from data when search */
const getPost = async (searchInput) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    let response = "";
    if (searchInput != "")
      response = await fetch(
        url + "post/search?title=" + searchInput,
        fetchOptions
      );
    else response = await fetch(url + "/post", fetchOptions);
    const post = await response.json();

    //create searched card
    createSearchCards(post, "searched_posts_list");
  } catch (e) {
    console.log(`failed to fetch post ${e.message}`);
  }
};

const createSearchCards = (posts) =>{

};
