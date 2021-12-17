'use strict';
const url = 'https://10.114.32.129/app'; // change url when uploading to a different server

const styleList = document.querySelector('.add-style');
const categoryList = document.querySelector('.add-category');
const editPostForm = document.querySelector('#editPostForm');

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

//Get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

const id = getQParam('id');

let styleFill = {};
let categoryFill = {};

//Create style options to <select>
const createStyleOptions = (styles) => {
    styleFill = styles;

    styles.forEach((style) => {
        styleList.innerHTML += `<option value="${style.style_id}">${style.style_name}</option>`;
    });
};

//Get styles to form options
const getStyles = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/style', fetchOptions);
        const styles = await response.json();
        createStyleOptions(styles);
    } catch (e) {
        console.log(e.message);
    }
};

//Create category options to <select>
const createCategoryOptions = (categories) => {
    categoryFill = categories;

    categories.forEach((category) => {
        categoryList.innerHTML += `<option value="${category.category_id}">${category.category_name}</option>`;
    });
};

//Get categories to form options
const getCategories = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/category', fetchOptions);
        const categories = await response.json();
        createCategoryOptions(categories);
    } catch (e) {
        console.log(e.message);
    }
};

//Adding delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// AJAX calls
const getPost = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url +'/post/' +  id, fetchOptions);
        const post = await response.json();
        await delay(100);
        fillOutFields(post);
    } catch (e) {
        console.log(e.message);
    }
};

//Fill out the field with the data from the original post
const fillOutFields = ((post) => {

    const title = document.querySelector('#title-fill');
    const description = document.querySelector('#description-fill');
    const style = document.querySelector('#style-fill');
    const category = document.querySelector('#category-fill');
    const location = document.querySelector('#location-fill');

    const styleObject = styleFill.find(o => o.style_name === `${post.style_name}`);
    const categoryObject = categoryFill.find(o => o.category_name === `${post.category_name}`);

    title.defaultValue = post.title;
    description.defaultValue = post.description;
    location.defaultValue = post.location;
    style.selectedIndex = 10 - styleObject.style_id;
    category.selectedIndex = 4 - categoryObject.category_id;
});

getStyles();
getCategories();
getPost();

//Submit edit post form
editPostForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(editPostForm);
    try {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: new URLSearchParams({
                'title': fd.get('title'),
                'description': fd.get('description'),
                'style_id': fd.get('style_id'),
                'category_id': fd.get('category_id'),
                'location': fd.get('location'),
            })
        };
        const response = await fetch(url + '/post/' + id, fetchOptions);
        const json = await response.json();
        alert('Post edited successfully!');
        location.href = `../post-details/post-details.html?id=${id}`;
    } catch (e) {
        console.log(e.message);
    }
});