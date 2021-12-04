'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server
const id = 1;

const createPosts = (posts) => {
    const postsDiv = document.querySelector('.posts');

    posts.forEach((post, index) => {

        let side = 'left';
        if(index % 2 === 1){
            side = 'right';
        }

        postsDiv.innerHTML += `
        <div class="single-post ${side}">
                    <div class="post-photo">
                        <img src="${post.image}">
                    </div>
                    <div class="post-details">
                        <div class="post-title">
                            <p class="title"><a href="../post-details/post-details.html?id=${post.post_id}">${post.title}</a></p>
                        </div>
                        <div class="post-stats">
                            <div class="post-likes">
                                <img src="../assets/heart-icon-off.png">
                                <p>${post.num_likes}</p>
                            </div>
                            <div class="post-comments">
                                <img src="../assets/comment-icon.png">
                                <p>${post.num_comments}</p>
                            </div>
                        </div>
                    </div>
                </div>`

    });
}

//TODO - add followers and following count to backend
const addUserData = (user) => {
    const profileDiv = document.querySelector('.profile');

    profileDiv.innerHTML += `<div class="profile-photo">
                <img class="profile-photo" src="${user.profile_picture}">
            </div>
            <div class="profile-data">
                <div class="user-follow">
                    <p class="username">${user.username}</p>
                    <button class="follow-btn"><a>Follow</a></button>
                </div>
                <div class="profile-stats">
                    <p class="profile-follower-count"><span class="follower-count">${user.followerCount ? 'TODO' : 0}</span> followers</p>
                    <p class="profile-following-count"><span class="following-count">${user.followingCount ? 'TODO' : 0}</span> following</p>
                </div>
                <div class="description">
                    <p>${user.bio ? user.bio : ''}</p>
                </div>
            </div>`;

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

// AJAX calls
const getPosts = async () => {
    try {
        const response = await fetch(url + '/user/' + id + '/post');
        const posts = await response.json();
        createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPosts();

const getUserData = async () => {
    try {
        const response = await fetch(url + '/user/' + id);
        const user = await response.json();
        addUserData(user);
    } catch (e) {
        console.log(e.message);
    }
};
getUserData();