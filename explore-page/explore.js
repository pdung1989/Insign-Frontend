"use strict";


const blogs = document.querySelector(".blogs");
blogs.setAttribute("class", "blogs");

function getRandomImage() {
  //declare an array to store the images
  let randomImage = new Array();

    //insert the URL of images in array
    randomImage[0] =
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80";
    randomImage[1] =
      "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80";
    randomImage[2] =
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";
    randomImage[3] =
      "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80";
    randomImage[4] =
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";
    randomImage[5] =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1858&q=80";
      randomImage[6] =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1858&q=80";

 

  //let number = Math.floor(Math.random() * posts.length);
  //loop to display five randomly chosen images at once
  for(let i = 0; i < 9; i++) {
  
  //posts.forEach((post) => {
    //generate a number and provide to the image to generate randomly
    let number = Math.floor(Math.random() * randomImage.length);
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("height", 450);
    img.setAttribute("width", 400);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const column = document.createElement("div");
    column.setAttribute("class", "column");
    
    

    img.src = randomImage[number];
    console.log(`set img src: ${img.src}`);
    a.appendChild(img);
    card.appendChild(a);
    column.appendChild(card);
    blogs.appendChild(column);
  //});
};
};
getRandomImage();
