'use strict'

const hamburgerButton = document.querySelector('.toggle');
const home = document.querySelector('#home');
const explore = document.querySelector('#explore');
//const upload = document.querySelector('#upload');
const myAccount = document.querySelector('#myaccount');

const toggleNav = () => {
    if(home.classList.contains('active')){
        home.classList.remove('active');
        explore.classList.remove('active');
        //upload.classList.remove('active');
        myAccount.classList.remove('active');
    } else {
        home.classList.add('active');
        explore.classList.add('active');
        //upload.classList.add('active');
        myAccount.classList.add('active');
    }
};

hamburgerButton.addEventListener('click', toggleNav);