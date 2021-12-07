'use strict';
const url = 'http://localhost:3000';
let commentCount = 0;

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get(param));
    return urlParams.get(param);
};

//Create post div
const createPost = (post) => {
    commentCount = post.num_comments;

    const postDiv = document.querySelector('.post');
    postDiv.innerHTML += `<div class="title">
                <p>${post.title}</p>
            </div>
            <div class="location">
            <img src="../assets/pin.svg">
            <p>${post.location}</p>
            </div>
            <div class="image">
                <img src="${post.image}">
            </div>
            <div class="post-data">
                <div class="post-likes">
                    <img src="../assets/heart-icon-off.svg">
                    <p>${post.num_likes}</p>
                </div>
                <div class="post-favorite">
                    <img src="../assets/favorites-icon.svg">
                </div>
            </div>
            <div class="description-with-decor">
                <div class="description">
                    <p class="description-title">Description</p>
                    <p class="description-text">${post.description}</p>
                </div>
            </div>
            `
}

//Create author div
const addAuthor = (author) => {
    const postDiv = document.querySelector('.post');
    postDiv.innerHTML += `<p class="author-title">Author</p>
                <div class="author">
                <a href="../userpage/userpage.html?id=${author.user_id}">
                    <img src="${author.profile_picture}">
                </a>
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

//Add comments
//TODO - delete "user id" input when backend authentication is done
const createComments = (comments) => {
    const postDiv = document.querySelector('.post');

    postDiv.innerHTML += `<p class="comments-title">${commentCount} comments</p>
            <div class="form-wrapper">
                <form method="post" action="http://localhost:3000/comment" enctype="application/x-www-form-urlencoded" id="addCommentForm">
                    <textarea rows="10" cols="10" class="add-comment-content" required minlength="4" maxlength="500" name="content" placeholder="write your comment here"></textarea>
                    <input type="hidden" name="post_id" value='${getQParam('id')}'>
                    <input type="hidden" name="user_id" value="2">
                    <button class="comment-add-btn" type="submit"><a>></a></button>
                </form>
            </div>`;

    comments.forEach((comment) => {
        postDiv.innerHTML += `<div class="single-comment">
                <div class="comment-image">
                    <img src="${comment.profile_picture}">
                </div>
                <div class="comment-details">
                    <p class="comment-author">${comment.username}</p>
                    <p class="comment-text">${comment.content}</p>
                    <p class="comment-date">2020.12.03. 14:35:12</p>
                </div>
            </div>`;
    })
}

const addCommentForm = (() => {
    const addCommentForm = document.querySelector('#addCommentForm');
    // AddComment
    addCommentForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const fd = new FormData(addCommentForm);
        const fetchOptions = {
            method: 'POST',
            body: new URLSearchParams({
                'post_id': fd.get('post_id'),
                'user_id': fd.get('user_id'),
                'content': fd.get('content')
            })
        };
        const response = await fetch(url + '/comment', fetchOptions);
        const json = await response.json();
        alert('Your comment was added successfully!');
        location.reload();
    });
})

// AJAX call
const getPost = async (post_id) => {
    try {
        const response = await fetch(url +'/post/' +  post_id);
        const post = await response.json();

        const user_id = post.author;
        const response_a = await fetch(url +'/user/' +  user_id);
        const author = await response_a.json();

        const response_c = await fetch(url +'/post/' +  post_id + '/comment');
        const comments = await response_c.json();

        createPost(post);
        addAuthor(author);
        createComments(comments);
        addCommentForm();
    } catch (e) {
        console.log(e.message);
    }
};

getPost(getQParam('id'));