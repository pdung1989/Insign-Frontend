'use strict'

const hamburgerButton = document.querySelector('.toggle');
const home = document.querySelector('#home');
const explore = document.querySelector('#explore');
const myAccount = document.querySelector('#myaccount');

const logOut = document.querySelector('#logout');
logOut.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.replace("../login-signup/forms.html");
})

const toggleNav = () => {
    if(home.classList.contains('active')){
        home.classList.remove('active');
        explore.classList.remove('active');
        myAccount.classList.remove('active');
    } else {
        home.classList.add('active');
        explore.classList.add('active');
        myAccount.classList.add('active');
    }
};

hamburgerButton.addEventListener('click', toggleNav);