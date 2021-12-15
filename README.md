# Insign-Frontend
## Overview
Welcome to Insign! This is a home decoration and interior design web platform where people can seek inspirations or communicate your ideas with everyone involved. Insign is readily available and user friendly for people who are dreaming up a perfect home to be their own interior designer.
> See the good in yourself and in others.

## Who is Insign for?
Insign mainly targets three groups of user and divides its features accordingly.
1. People who are interested in home design or begin to grow interest in the topic landing to the website can see some of the home decoration ideas and pictures. No interaction is available unless they sign up/log in.
2. Hobbyists - people who want to involve in the related topics and registerd themselves as 'user'. Available features: Add posts, like and add posts to favorite list, comment on others' posts and browse the latest posts by people they are following.
3. Designers - suited for professionals in architecture, construction, engineering and commercial interior design. Besides having all the functionalities of a user, 'Designer/Professional' users can also promote and have their works approached potential customers more easily with the 'boost post' suggestion feature.

## Presentation
A first look to Insign
<!-- Add a screenshot of a working app with some nice post display from databasr -->
## Installation

This is a project, which is uploaded in two separate GitHub repositories. You can find the [backend here](https://github.com/pdung1989/Insign-Backend) and you will also need a MySQL server in order to properly run Insign.

1. Git clone the frontend and the backend into 2 separate directories in your local machine
2. Install [WebStorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/) (whichever you prefer)
3. Open the backend folder in WebStorm or Visual Studio Code and install Node.js + all required dependencies:
```bash
npm i
```
4. Open the tables.txt file in the backend and paste all the content into the MySQL server's input field(CHANGE LATER, IDK WHAT TO WRITE HERE)
5. Add a .env file to the backend folder and fill out the empty fields (to connect your backend to the MySQL database
```bash
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=ewrweokfwdfvljj
```
6. If you're running the backend server on your local machine, change all the 'url' variables in the frontend JS files to localhost (if you're on a virtual machine, make sure that the address points to your active Node.js backend
```javascript
const url = 'http://localhost:3000';
```
7. Open the frontend's 'home' html file in the Live Server on WebStorm or install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) on Visual Studio Code and run the frontend there.
8. Create an account and have fun :)

## Usage

SOMETHING

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## Credits
- Tamas Kralusz
- Dung Tran
- An Huynh

## License
Insign project uses [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)