'use strict';

const url = 'http://10.114.32.129/app'; // change url when uploading to a different server

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get(param));
    return urlParams.get(param);
};

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

let followerCount = 0;

//Create cards for all posts
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
                                <img src="../assets/comment-icon.svg" alt="comments" src="">
                                <p>${post.num_comments}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    });
};

//Show user data below posts
const addUserData = (userProfile) => {
    const profileDiv = document.querySelector('.profile');
    followerCount = userProfile.num_follower;

    profileDiv.innerHTML += `<div class="profile-photo">
                <img class="profile-photo" src="${url + '/uploads/' + userProfile.profile_picture}" alt="profile photo">
            </div>
            <div class="profile-data">
                <div class="user-follow">
                    <p class="username">${userProfile.username}</p>
                </div>
                <div class="profile-stats">
                    <p class="profile-follower-count"><span class="follower-count">${followerCount}</span> followers</p>
                    <p class="profile-following-count"><span class="following-count">${userProfile.num_following}</span> following</p>
                </div>
                <div class="description">
                    <p>${userProfile.bio ? userProfile.bio : ''}</p>
                </div>
            </div>`;

    if(userProfile.role_id === 2){
        const userDiv = document.querySelector('.user-follow');
        userDiv.innerHTML += `<img src="../assets/green-checkmark.svg" alt="verified">`;
    }

};

//Add follow button if the user visited someone else's page -> add "edit profile" button if it's the user's own page
const addFollowOrEditButtons = ((userProfile) => {
    const userFollowBtn = document.querySelector('.user-follow');
    if(user.user_id === userProfile.user_id){
        //TODO - add href
        userFollowBtn.innerHTML += `<a class="follow-btn" href="../edit-profile/edit-profile.html">Edit Profile</a>`;
    } else {
        userFollowBtn.innerHTML += `<a class="follow-btn">Follow</a>`;

        const followBtn = document.querySelector('.follow-btn');

        if(userProfile.is_followed === 1){
            followBtn.classList.add('unfollow');
            followBtn.textContent = "Unfollow";
        }

        const followerDiv = document.querySelector('.follower-count');

        followBtn.addEventListener('click', async () => {
            if(followBtn.classList.contains('unfollow')){
                //Unfollow user, remove from db
                try {
                    const fetchOptions = {
                        method: 'DELETE',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                    };
                    const response = await fetch(url + '/user/following/' + userProfile.user_id , fetchOptions);
                    const unFollowed = await response.json();
                    followBtn.classList.remove('unfollow');
                    followBtn.textContent = "Follow";
                    followerCount--;
                    followerDiv.innerHTML = followerCount;
                } catch (e) {
                    console.log(e.message);
                    alert("Couldn't unfollow user");
                }
                return;
            }
            //Follow user, add to db
            try {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                };
                const response = await fetch(url + '/user/following/' + userProfile.user_id, fetchOptions);
                const followed = await response.json();
                followBtn.classList.add('unfollow');
                followBtn.textContent = "Unfollow";
                followerCount++;
                followerDiv.innerHTML = followerCount;
            } catch (e) {
                console.log(e.message);
                alert("Couldn't follow user");
            }
        });
    }
});

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
        const userData = await response.json();
        if(userData.user_id === undefined) {
            const empty = document.querySelector('.user-not-found');
            const line = document.querySelector('.line');
            empty.style.display = 'flex';
            line.style.display = 'none';
        } else {
            addUserData(userData);
            addFollowOrEditButtons(userData);
        }
    } catch (e) {
        console.log(e.message);
    }
};
getUserData(getQParam('id'));