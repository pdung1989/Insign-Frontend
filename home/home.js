'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

const createPosts = (posts) => {
    const postsDiv = document.querySelector('.random-posts');

    posts.forEach( (post) => {
        console.log('foreach');
        postsDiv.innerHTML += `
                <div class="mySlides fade">
                    <img src="${post.image}" style="width:100%">
                    <div class="text">${post.title}</div>
                </div>`
    });

    const slideshowScript = document.createElement('script')
    slideshowScript.src = 'slideshow.js'
    document.body.appendChild(slideshowScript);
}

// AJAX calls
const getPosts = async () => {
    try {
        const response = await fetch(url + '/post?limit=5');
        const posts = await response.json();
        console.log(posts);
        await createPosts(posts);
    } catch (e) {
        console.log(e.message);
    }
};

getPosts();