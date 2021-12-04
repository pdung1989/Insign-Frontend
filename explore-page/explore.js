"use strict";


const blogs = document.querySelector(".blogs");
blogs.setAttribute("class", "blogs");

const createPostCard =  (posts) => {

  //for(let i = 0; i < 9; i++) {
  posts.forEach((post) => {
    //generate a number and provide to the image to generate randomly
     //let number = Math.floor(Math.random() * posts.length);
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("height", 450);
    img.setAttribute("width", 400);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const column = document.createElement("div");
    column.setAttribute("class", "column");
    const h3 = document.createElement("h3");
    h3.setAttribute("id", "title");
    

    img.src = post.image;
    h3.innerHTML = post.title;

    console.log(`set img src: ${img.src}`);
    a.appendChild(img);
    card.appendChild(h3);
    card.appendChild(a);
    
    column.appendChild(card);
    blogs.appendChild(column);
    
  });
};



const getPosts = async () => {
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  console.log(posts);
  
   
  createPostCard(posts);
  
}

getPosts();
