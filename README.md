# Insign-App
## Overview
Welcome to Insign! This is a home decoration and interior design web platform where people can seek inspirations or communicate their ideas with everyone involved. Insign is readily available and user friendly for people who are dreaming up a perfect home to be their own interior designer.
> See the good in yourself and in others.

## Who is Insign for?
Insign mainly targets three groups of user and divides its features accordingly.
1. People who are interested in home design or begin to grow interest in the topic landing to the website can see some of the home decoration ideas and pictures. No interaction is available unless they sign up/log in.
2. Hobbyists - people who want to involve in the related topics and registerd themselves as 'user'. Available features: Add posts, like and add posts to favorite list, comment on others' posts and browse the latest posts by people they are following.
3. Designers - suited for professionals in architecture, construction, engineering and commercial interior design. Besides having all the functionalities of a user, 'Designer/Professional' users can also promote and have their works approached potential customers more easily with the 'boost post' suggestion feature.

## Presentation
A first look to Insign

 <img src="/assets/Insign-demo.png" width="250"> <img src="/assets/Insign-demo2.png" width="250"> <img src="/assets/Insign-demo3.png" width="250">
## Stacks, tools, libraries:
1. Front-end: using AJAX, HTML5, CSS, responsive design
2. Back-end: 
- Using Node.js with express library 
- Authentication using Passport library, Local Storage strategy, JWT Strategy
- Validation using express-validator 
- Hashing password with bryptjs package and JWT_SECRET
3. Database: mySQL2, phpMyAdmin tool

## Server for database, back-end and front-end:
- Connect to Metropolia Ammattikorkeakoulu VPN
- Database is running on user metropolia server, (https://users.metropolia.fi/phpMyAdmin)
- Backend is on remote server of educloud virtual machine, (http://10.114.32.129/app/home)
- Frontend is on remote server, (http://10.114.32.129/~dtran/Insign-Frontend/home/home.html)

## Production server and deployment:
- Generate a self-signed certificate for CentOS
- Configure apache httpd proxy for https on virtual machine to run Node app - [Apach http proxy](https://github.com/ilkkamtk/wop/blob/master/week5.md)
- Upload back-end part to the virtual server and run
- Use Pm2 for automatic loading and running app
- Node app is running on port 3000 of production server.

## Installation
1. Git clone the [frontend](https://github.com/pdung1989/Insign-Frontend) and [the backend](https://github.com/pdung1989/Insign-Backend) (**master** branch) into 2 separate directories in your local machine. If you want to redirect from http to https, git clone branch **production**)
2. Install [WebStorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/) (whichever you prefer)
3. Open the backend folder in WebStorm or Visual Studio Code and install Node.js + all required dependencies:
```bash
npm i
```
```bash
node app.js
```
4. Install [phpMyAdmin](https://www.phpmyadmin.net/) platform
5. Open the insign-databse.txt file in the backend and paste all the content into the MySQL server's input field
6. Add a .env file to the backend folder and fill out the empty fields (to connect your backend to the MySQL database
```bash
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```
6. If you're running the backend server on your local machine, change all the 'url' variables in the frontend JS files to localhost (if you're on a virtual machine, make sure that the address points to your active Node.js backend
```javascript
const url = 'http://localhost:3000';
```
7. Open the frontend's 'home' html file in the Live Server on WebStorm or install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) on Visual Studio Code and run the frontend there.
8. Create an account and have fun :)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Insign project uses [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## Credits
- Tamas Kralusz
- Dung Tran
- An Huynh
