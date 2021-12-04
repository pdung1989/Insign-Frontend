'use strict';
const url = 'http://localhost:3000';

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get(param));
    return urlParams.get(param);
};

//Create post div
const createPost = (post) => {
    const postDiv = document.querySelector('.post');
    postDiv.innerHTML += `<div class="title">
                <p>${post.title}</p>
            </div>
            <div class="image">
                <img src="${post.image}">
            </div>
            <div class="post-data">
                <div class="post-likes">
                    <img src="../assets/heart-icon-off.png">
                    <p>4</p>
                </div>
                <div class="post-favorite">
                    <img src="../assets/favorites-icon.png">
                </div>
            </div>
            <div class="description">
                <p class="description-title">Description</p>
                <p class="description-text">${post.description}</p>
            </div>`
}

//Create author div
const addAuthor = (author) => {
    const postDiv = document.querySelector('.post');
    postDiv.innerHTML += `<div class="author">
                <img src="${author.profile_picture}">
                <div class="author-details">
                    <a class="username" href="../userpage/userpage.html?id=${author.user_id}">${author.username}</a>
                    <button class="follow-btn"><a>Follow</a></button>
                </div>
            </div>`

    //Follow button logic
    const followBtn = document.querySelector('.follow-btn');
    const followBtnText = document.querySelector('.follow-btn a');

    followBtn.addEventListener('click', () => {
        if(followBtn.classList.contains('unfollow')){
            followBtn.classList.remove('unfollow');
            followBtnText.textContent = "Follow";
            return;
        }
        followBtn.classList.add('unfollow');
        followBtnText.textContent = "Unfollow";
    });
}

// AJAX call
const getPost = async (post_id) => {
    try {
        const response = await fetch(url +'/post/' +  post_id);
        const post = await response.json();

        const user_id = post.author;
        const response_a = await fetch(url +'/user/' +  user_id);
        const author = await response_a.json();

        createPost(post);
        addAuthor(author);
    } catch (e) {
        console.log(e.message);
    }
};

getPost(getQParam('id'));
