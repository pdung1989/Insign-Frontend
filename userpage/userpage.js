'use strict';

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