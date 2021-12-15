'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));
if(user) {
    window.location.replace("../news-feed/feed.html");
}

//Create slides
const createPosts = (posts) => {
    const postsDiv = document.querySelector('.random-posts');

    posts.forEach( (post) => {
        console.log('foreach');
        postsDiv.innerHTML += `
                <div class="mySlides fade">
                    <img src="${post.image}" style="width:100%">
                    <div class="text">${post.title}</div>
                </div>`;
    });

    const slideshowScript = document.createElement('script');
    slideshowScript.src = 'slideshow.js';
    document.body.appendChild(slideshowScript);
};

// AJAX calls to fetch slideshow posts
const getPosts = async () => {
    try {
        const response = await fetch(url + '/home');
        const posts = await response.json();
        console.log(posts);
        await createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};

getPosts();