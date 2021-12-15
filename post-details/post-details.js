'use strict';
const url = 'http://localhost:3000';
let commentCount = 0;
let likeCount = 0;

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

const post_id = getQParam('id');

const postDiv = document.querySelector('.post');
const modal = document.getElementById("myModal");
const modalContent = document.querySelector('.modal-content');

//Create post div
const createPost = (post) => {
    commentCount = post.num_comments;
    likeCount = post.num_likes;

    let isLiked = 'unliked';
    if(post.self_like === 1) {
        isLiked = 'liked';
    }

    let isFavorite = 'unfavorite';
    if(post.self_favorite === 1) {
        isFavorite = 'favorite';
    }

    postDiv.innerHTML += `<div class="title">
                <p>${post.title}</p>
            </div>
            <div class="location">
            <img src="../assets/pin.svg">
            <p>${post.location}</p>
            </div>
            <div class="post-actions">
                <!--- EDIT/DELETE WITH PERMISSION --->
            </div>
            <div class="image">
                <img src="${url + '/uploads/' + post.image}">
            </div>
            <div class="post-data">
                <div class="post-likes">
                       <img class="${isLiked}">
                    <p>${post.num_likes}</p>
                </div>
                <div class="post-favorite">
                    <img class="${isFavorite}"">
                </div>
            </div>
            <div class="description-with-decor">
                <div class="description">
                    <p class="description-title">Description</p>
                    <p class="description-text">${post.description}</p>
                </div>
            </div>
            <div class="post-style-category">
                <div class="style">
                    <p class="style-title">Style</p>
                    <p>${post.style_name}</p>
                </div>
                <div class="category">
                    <p class="category-title">Category</p>
                    <p>${post.category_name}</p>
                </div>
            </div>`;


    const postActionButtonsDiv = document.querySelector('.post-actions');

    //Add delete button for post, if the user is admin
    if(user.role_id === 0) {
        postActionButtonsDiv.innerHTML += `<button class="post-delete-btn"><a>DELETE</a></button>`;
    }

    //Add edit + delete button for post, if the user is the post's author
    if(post.author === user.user_id) {
        postActionButtonsDiv.innerHTML = `<button class="post-delete-btn"><a>DELETE</a></button>
                                            <button class="post-edit-btn"><a href="../edit-post/edit-post.html?id=${post_id}">EDIT</a></button>`;
    }

};

//Create author div
const addAuthor = (author) => {
    postDiv.innerHTML += `<p class="author-title">Author</p>
                <div class="author">
                <a href="../userpage/userpage.html?id=${author.user_id}">
                    <img src="${url + '/uploads/' + author.profile_picture}" alt="${author.username}'s profile picture">
                </a>
                <div class="author-details">
                    <a class="username" href="../userpage/userpage.html?id=${author.user_id}">${author.username}</a>
                </div>
            </div>`;

    if(author.role_id === 2){
        const userDiv = document.querySelector('.author-details');
        userDiv.innerHTML += `<img src="../assets/green-checkmark.svg">`;
    }
};

//Add comments to the UI
const createComments = (comments) => {

    //"Add comment" function with form
    postDiv.innerHTML += `<p class="comments-title">${commentCount} comments</p>
            <div class="form-wrapper">
                <form method="post" action="http://localhost:3000/comment" enctype="application/x-www-form-urlencoded" id="addCommentForm">
                    <textarea rows="10" cols="10" class="add-comment-content" required minlength="4" maxlength="500" name="content" placeholder="write your comment here"></textarea>
                    <input type="hidden" name="post_id" value='${post_id}'>
                    <input type="hidden" name="user_id" value="2">
                    <button class="comment-add-btn" type="submit"><a>></a></button>
                </form>
            </div>`;

    //Add all comments to the ui
    if(comments.message !== 'Comments not found'){
        comments.forEach((comment) => {
            const commentDate = comment.comment_date.slice(0, -5).replace('T', ' ');

            postDiv.innerHTML += `<div class="single-comment">
                                    <div class="comment-image">
                                        <a href="../userpage/userpage.html?id=${comment.user_id}">
                                        <img src="${url + '/uploads/' + comment.profile_picture}" alt="${comment.username}'s profile picture">
                                        </a>
                                    </div>
                                    <div class="comment-details${comment.comment_id}">
                                        <a href="../userpage/userpage.html?id=${comment.user_id}">
                                            <p class="comment-author">${comment.username}</p>
                                        </a>
                                        <p class="comment-text">${comment.content}</p>
                                        <p class="comment-date">${commentDate}</p>
                                    </div>
                                </div> `;

            postDiv.innerHTML += `<div class="comment-buttons${comment.comment_id}"></div>`;
            const commentButtonsDiv = document.querySelector(`.comment-buttons${comment.comment_id}`);

            //Add delete button for comment, if the user is admin
            if(user.role_id === 0){
                commentButtonsDiv.innerHTML = `<button class="comment-delete" id="delete${comment.comment_id}">Delete</button>`;
            }

            //Add edit + delete button for comment, if the user is the comment's author
            if(user.user_id === comment.user_id){
                commentButtonsDiv.innerHTML = `<button class="comment-edit" id="edit${comment.comment_id}">Edit</button>
                                    <button class="comment-delete" id="delete${comment.comment_id}">Delete</button>`;
            }

            //Add edited_date if available
            const commentDetailsDiv = document.querySelector(`.comment-details${comment.comment_id}`);
            if (comment.edited_date !== null) {
                const commentEditDate = comment.edited_date.slice(0, -5).replace('T', ' ');
                commentDetailsDiv.innerHTML += `<p class="comment-edit-date">(edited ${commentEditDate})</p>`;
            }

        });

        //Open modal to edit comment when Edit button is clicked
        comments.forEach((comment) => {
            if(user.user_id === comment.user_id){
                document.getElementById(`edit${comment.comment_id}`).addEventListener('click', async() => {

                    modalContent.innerHTML = `<span class="edit-close">&times;</span>
                    <div class="form-wrapper" id="editForm">
                    <form id="editCommentForm">
                        <textarea class="edit-comment-area${comment.comment_id}" rows="10" cols="10" required minlength="4" maxlength="500" name="content" placeholder="write your comment here">${comment.content}</textarea>
                        <input type="hidden" name="comment_id" value='${comment.comment_id}'>
                        <button class="comment-edit-btn${comment.comment_id}" type="submit"><a>></a></button>
                    </form>
                </div>`;

                    modal.style.display = "flex";

                    //Edit comment in db
                    document.getElementById('editCommentForm').addEventListener('submit', async(event) => {
                        event.preventDefault();
                        const editCommentForm = document.querySelector('#editCommentForm');
                        const fd = new FormData(editCommentForm);
                        const fetchOptions = {
                            method: 'PUT',
                            headers: {
                                Authorization: "Bearer " + sessionStorage.getItem("token"),
                            },
                            body: new URLSearchParams({
                                'content': fd.get('content')
                            })
                        };
                        try {
                            const response = await fetch(url + '/comment/' + fd.get('comment_id'), fetchOptions);
                            const json = await response.json();
                            alert('Comment updated successfully!');
                            location.reload();
                        } catch (e) {
                            console.log(e.message);
                        }
                    });

                    document.getElementsByClassName("edit-close")[0].addEventListener('click', () => {
                        modal.style.display = "none";
                    });
                });
            }
        });

        //Delete comment from database when the Delete button is clicked
        comments.forEach((comment) =>  {
            if(user.user_id === comment.user_id || user.role_id === 0) {
                document.getElementById(`delete${comment.comment_id}`).addEventListener('click', async (evt) => {
                    const answer = window.confirm("Are you sure you'd like to delete this comment?");
                    if(answer){
                        const commentId = evt.target.id.replace(/\D/g, "");
                        const fetchOptions = {
                            method: 'DELETE',
                            headers: {
                                Authorization: "Bearer " + sessionStorage.getItem("token"),
                            },
                        };
                        try {
                            const response = await fetch(url + '/comment/' + commentId, fetchOptions);
                            const json = await response.json();
                            alert('Comment deleted successfully!');
                            location.reload();
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                });
            }
        });
    }
};

//Add comment to database, when the add button is clicked
const addCommentForm = (() => {
    const addCommentForm = document.querySelector('#addCommentForm');

    addCommentForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const fd = new FormData(addCommentForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: new URLSearchParams({
                'post_id': fd.get('post_id'),
                'content': fd.get('content')
            })
        };
        const response = await fetch(url + '/comment', fetchOptions);
        const json = await response.json();
        alert('Your comment was added successfully!');
        location.reload();
    });
});

//Check when the user likes/unlikes a post
const likeUnlike = (() => {
    const likeButton = document.querySelector('.post-likes img');
    likeButton.addEventListener('click', async () => {
        const likeCountP = document.querySelector('.post-likes p');

        if(likeButton.className === 'unliked'){
            likeButton.setAttribute('class', 'liked')

            try {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                };
                const response = await fetch(url +'/post/' +  post_id + '/likes', fetchOptions);
                const like = await response.json();

                likeCount++;
                likeCountP.innerHTML = `${likeCount}`;
            }catch(e) {
                console.log(e.message);
            }
        } else {
            likeButton.setAttribute('class', 'unliked');

            try {
                const fetchOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                };
                const response = await fetch(url +'/post/' +  post_id + '/likes', fetchOptions);
                const unLike = await response.json();

                likeCount--;
                likeCountP.innerHTML = `${likeCount}`;
            }catch(e) {
                console.log(e.message);
            }
        }
    });
});

//Check when the user favorites/unfavorites a post
const favoriteUnfavorite = (() => {
    const favoriteButton = document.querySelector('.post-favorite img');
    favoriteButton.addEventListener('click', async () => {

        if(favoriteButton.className === 'unfavorite'){
            favoriteButton.setAttribute('class', 'favorite');

            try {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                };
                const response = await fetch(url +'/post/' +  post_id + '/favorites', fetchOptions);
                const favorite = await response.json();
            }catch(e) {
                console.log(e.message);
            }
        } else {
            favoriteButton.setAttribute('class', 'unfavorite');

            try {
                const fetchOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                };
                const response = await fetch(url +'/post/' +  post_id + '/favorites', fetchOptions);
                const unFavorite = await response.json();
            }catch(e) {
                console.log(e.message);
            }
        }
    })
})

//Add listener to delete post
const deletePostListener = ((post_id, author) => {

    if(user.user_id === author.user_id || user.role_id === 0){
        document.querySelector('.post-delete-btn').addEventListener('click', (async () => {
            const answer = confirm("Are you sure you'd like to delete this post?");
            if(answer){
                try {
                    const fetchOptions = {
                        method: 'DELETE',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                    };
                    const response = await fetch(url + "/post/" + post_id, fetchOptions);
                    const deleted = await response.json();
                    window.location.replace(`../userpage/userpage.html?id=${user.user_id}`);
                } catch (e) {
                    console.log(e.message);
                    alert('Error deleting post');
                }
            }
        }));
    }
});

// AJAX calls
const getPost = async (post_id) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url +'/post/' +  post_id, fetchOptions);
        const post = await response.json();

        const user_id = post.author;
        const response_a = await fetch(url +'/user/' +  user_id, fetchOptions);
        const author = await response_a.json();

        const response_c = await fetch(url +'/post/' +  post_id + '/comment', fetchOptions);
        const comments = await response_c.json();

        if(post.post_id === undefined){
            const empty = document.querySelector('.post-not-found');
            empty.style.display = 'flex';
        } else{
            createPost(post);
            addAuthor(author);
            createComments(comments);
            addCommentForm();
            likeUnlike();
            favoriteUnfavorite();
            deletePostListener(post_id, author);
        }
    } catch (e) {
        console.log(e.message);
    }
};

getPost(post_id);