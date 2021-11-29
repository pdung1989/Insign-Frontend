'use strict'

const hamburgerButton = document.querySelector('.toggle');
const home = document.querySelector('#home');
const explore = document.querySelector('#explore');
const account = document.querySelector('#account');

const toggleNav = () => {
    if(home.classList.contains('active')){
        home.classList.remove('active');
        explore.classList.remove('active');
        account.classList.remove('active');
    } else {
        home.classList.add('active');
        explore.classList.add('active');
        account.classList.add('active');
    }
};

hamburgerButton.addEventListener('click', toggleNav);