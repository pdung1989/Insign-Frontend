'use strict';

const hamburgerButton = document.querySelector('.toggle');
const home = document.querySelector('#home');
const signIn = document.querySelector('#signin');

//Toggle mobile navigation with hamburger icon
const toggleNav = () => {
    if(home.classList.contains('active')){
        home.classList.remove('active');
        signIn.classList.remove('active');
    } else {
        home.classList.add('active');
        signIn.classList.add('active');
    }
};

hamburgerButton.addEventListener('click', toggleNav);