'use strict';
const url = "http://localhost:3000"; //TODO: change url to server

const editProfileForm = document.querySelector('#editProfileForm');
const editProfilePictureForm = document.querySelector('#editProfilePictureForm');

//Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

const myAccountBtn = document.querySelector('#myaccount a');
myAccountBtn.setAttribute("href", `../userpage/userpage.html?id=${user.user_id}`);
const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.setAttribute("href", `../favorites/favorites.html?id=${user.user_id}`);

//Fill out the field with the data from the original post
const fillOutFields = ((userData) => {

    const username = document.querySelector('#username-fill');
    const email = document.querySelector('#email-fill');
    const role = document.querySelector('#role-fill');
    const bio = document.querySelector('#bio-fill');

    username.defaultValue = userData.username;
    email.defaultValue = userData.email;
    bio.defaultValue = userData.bio || '';
    role.selectedIndex = userData.role_id;
});

//Show photo when user uploads or replaces it
const imgInp = document.querySelector('#imgInp');
const showImg = document.querySelector('#show-img');
imgInp.onchange = () => {
    const [file] = imgInp.files;
    if (file) {
        showImg.src = URL.createObjectURL(file);
    }
};

//Submit edit profile picture form
editProfilePictureForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(editProfilePictureForm);
        try {
            const fetchOptions = {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: fd
            };
            const response = await fetch(url + '/user/profilePicture', fetchOptions);
            const json = await response.json();
            alert('Profile picture updated successfully!');
            location.reload();
        } catch(e) {
            console.log(e);
        }
});

//Submit edit profile data form
editProfileForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(editProfileForm);

    if(fd.get('password') !== fd.get('password2')){
        alert("Passwords don't match");
    } else {
        fd.delete('password2');
        for(let pair of fd.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        try {
            const fetchOptions = {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: new URLSearchParams({
                    'username': fd.get('username'),
                    'email': fd.get('email'),
                    'password': fd.get('password'),
                    'bio': fd.get('bio') || "",
                    'role_id': fd.get('role_id'),
                })
            };
            const response = await fetch(url + '/user/', fetchOptions);
            const json = await response.json();
            alert('Profile updated successfully!');
            location.href = `../userpage/userpage.html?id=${user.user_id}`;
        } catch(e) {
            console.log(e);
        }
    }
});

const getUserData = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const response = await fetch(url + '/user/' + user.user_id, fetchOptions);
        const userData = await response.json();
        fillOutFields(userData);
    } catch (e) {
        console.log(e.message);
    }
};
getUserData();