'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server
const id = 1;

/*
const createPost = (post) => {
    const postDiv = document.querySelector('.post');
    postDiv.innerHTML += ``
}

// AJAX calls
const getPost = async () => {
    try {
        const response = await fetch(url +'/post/' +  id);
        const post = await response.json();
        createPost(post);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();
*/

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