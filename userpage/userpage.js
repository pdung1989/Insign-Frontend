'use strict';

//Static posts data TODO - fetch from backend
let posts = [
    {
        "id": 1,
        "title": "Dining room with bright colors",
        "image": "https://s3images.zee5.com/wp-content/uploads/2021/08/aa2ca5d9-883f-4d12-8fdb-2fa13bc6d1b5-Carpetright-House-Beautiful-Portobello-Carpet-In-Riverside-designsecrets.jpeg",
        "likeCount": 34,
        "commentCount": 10
    },
    {
        "id": 2,
        "title": "Modern living room",
        "image": "https://media.designcafe.com/wp-content/uploads/2020/03/21013530/interior-design-trends-hyderabad-2020.jpg",
        "likeCount": 65,
        "commentCount": 7
    },
    {
        "id": 3,
        "title": "Reception desk with plants",
        "image": "https://www.jll-architecture.fi/content/uploads/2020/02/JLL-Tilakuvaus-17.10.2019-%C2%A9-Hannakaisa-Pekkala-5-scaled-2000x1300-c-default.jpg",
        "likeCount": 46,
        "commentCount": 4
    },{
        "id": 4,
        "title": "Luxury living room design",
        "image": "https://archello.s3.eu-central-1.amazonaws.com/images/2019/01/07/Interior-Design-of-Luxury-Modern-Residence-6.1546900319.0638.jpg",
        "likeCount": 345,
        "commentCount": 2
    },
    {
        "id": 5,
        "title": "Living room with wooden furniture",
        "image": "https://cdn.shopify.com/s/files/1/0509/5456/7874/articles/02180243-17834956-1449946661736181-683287224761190704-o_cover_2000x1125_0358b491-9775-4774-bb5b-23aab5b34352.jpg?v=1620122224",
        "likeCount": 43,
        "commentCount": 6
    },
];

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
                        <p class="title">${post.title}</p>
                    </div>
                    <div class="post-stats">
                        <div class="post-likes">
                            <img src="../assets/heart-icon-off.png">
                            <p>${post.likeCount}</p>
                        </div>
                        <div class="post-comments">
                            <img src="../assets/comment-icon.png">
                            <p>${post.commentCount}</p>
                        </div>
                    </div>
                </div>
            </div>`
});

//Static user data TODO - fetch from backend

let userData =
    {
        "user_id": 1,
        "username": "designer2021",
        "profile_picture": "https://i.pinimg.com/736x/55/e8/80/55e880a7a142b2f0363cfb580506a2fc.jpg",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "followerCount": 334,
        "followingCount": 18
    };

const profileDiv = document.querySelector('.profile');

profileDiv.innerHTML += `<div class="profile-photo">
                <img class="profile-photo" src="${userData.profile_picture}">
            </div>
            <div class="profile-data">
                <div class="user-follow">
                    <p class="username">${userData.username}</p>
                    <button class="follow-btn"><a>Follow</a></button>
                </div>
                <div class="profile-stats">
                    <p class="profile-follower-count"><span class="follower-count">${userData.followerCount}</span> followers</p>
                    <p class="profile-following-count"><span class="following-count">${userData.followingCount}</span> following</p>
                </div>
                <div class="description">
                    <p>${userData.bio}</p>
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