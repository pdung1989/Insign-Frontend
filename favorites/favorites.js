'use strict';

const url = 'https://10.114.32.129/app'; // change url when uploading to a different server

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));
const user_id = user.user_id;

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

//Create post cards
const createPosts = (posts) => {
    const postsDiv = document.querySelector('.posts');

    posts.forEach((post, index) => {

        let side = 'left';
        if(index % 2 === 1){
            side = 'right';
        }

        if(index > 0) {
            postsDiv.innerHTML += '<div class="post-line"></div>';
        }

        let isLiked = 'unliked';
        if(post.self_like === 1) {
            isLiked = 'liked';
        }

        postsDiv.innerHTML += `<div class="single-post ${side}">
                    <div class="post-photo">
                        <a href="../post-details/post-details.html?id=${post.post_id}">
                            <img src="${url + '/uploads/' + post.image}" alt="post image">
                        </a>
                    </div>
                    <div class="post-details">
                        <div class="post-title">
                            <p class="title"><a href="../post-details/post-details.html?id=${post.post_id}">${post.title}</a></p>
                        </div>
                        <div class="post-stats">
                            <div class="post-likes">
                                <img class="${isLiked}" alt="like button" src="">
                                <p>${post.num_likes}</p>
                            </div>
                            <div class="post-comments">
                                <img src="../assets/comment-icon.svg" alt="comment button">
                                <p>${post.num_comments}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    });
};

// AJAX calls
const getPosts = async (id) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/user/' + id + '/favorites', fetchOptions);
        const posts = await response.json();

        if(posts.length === 0) {
            document.querySelector('.empty-favorites').style.display = 'flex';
            return;
        }
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPosts(user_id);