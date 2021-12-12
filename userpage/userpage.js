'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get(param));
    return urlParams.get(param);
};

// get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

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
                                <img class="${isLiked}">
                                <p>${post.num_likes}</p>
                            </div>
                            <div class="post-comments">
                                <img src="../assets/comment-icon.svg">
                                <p>${post.num_comments}</p>
                            </div>
                        </div>
                    </div>
                </div>`
    });
}

//TODO - add followers and following count to backend
const addUserData = (userProfile) => {
    const profileDiv = document.querySelector('.profile');

    profileDiv.innerHTML += `<div class="profile-photo">
                <img class="profile-photo" src="${userProfile.profile_picture}">
            </div>
            <div class="profile-data">
                <div class="user-follow">
                    <p class="username">${userProfile.username}</p>
                </div>
                <div class="profile-stats">
                    <p class="profile-follower-count"><span class="follower-count">${userProfile.followerCount ? 'TODO' : 0}</span> followers</p>
                    <p class="profile-following-count"><span class="following-count">${userProfile.followingCount ? 'TODO' : 0}</span> following</p>
                </div>
                <div class="description">
                    <p>${userProfile.bio ? userProfile.bio : ''}</p>
                </div>
            </div>`;

    const userFollowBtn = document.querySelector('.user-follow');
    if(user.user_id === userProfile.user_id){
        //TODO - add href
        userFollowBtn.innerHTML += `<button class="follow-btn"><a>Edit Profile</a></button>`;
    } else {
        userFollowBtn.innerHTML += `<button class="follow-btn"><a>Follow</a></button>`;

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
}

// AJAX calls
const getPosts = async (id) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/user/' + id + '/post', fetchOptions);
        const posts = await response.json();
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPosts(getQParam('id'));

const getUserData = async (id) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/user/' + id, fetchOptions);
        const user = await response.json();
        addUserData(user);
    } catch (e) {
        console.log(e.message);
    }
};
getUserData(getQParam('id'));