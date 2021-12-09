'use strict'

const hamburgerButton = document.querySelector('.toggle');
const home = document.querySelector('#home');
const signIn = document.querySelector('#signin');

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