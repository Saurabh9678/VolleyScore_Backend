# VolleyScore_Backend
Backend for the app developed during Codewar 4.0 codestellation

This is a backend application built using Node.js, Express.js, and MongoDB. It provides a REST API for tracking the score of a volleyball game. The application is divided into two parts, one for the organiser and one for the team. The organiser can create a room and a unique code will be generated. The teams can join the room using the unique code and monitor the game. The organiser can update the score of the team and each player.

# Installation
To install the dependencies, run the following command: `npm install`

# Usage
To start the application, run the following command: `npm start`  
The application will start listening on the port specified in the environment variable PORT (default is 4000).  

Before running the application, make sure to set the following environment variables:  
`DB_URI` = The DB_URI environment variable should contain the MongoDB connection string.   
`PORT` = Give a port number (eg: 4000,3000)  


# Password Hashing
Password hashing is implemented using bcryptjs. When a user signs up, their password is hashed and stored in the database. When a user logs in, their password is hashed and compared to the hashed password stored in the database.

# Authentication
Authentication is implemented using the find method in MongoDB. When a user logs in, their username and password are checked against the database. If the username and password match, the user is authenticated.

# API Endpoints
Base URL : `DOMAIN-NAME/api/v1`  
The following API endpoints are available:

# Authentication Endpoints
`POST /register` : Allows a user/organiser to sign up by providing a username,role and password.  
`POST /login` : Allows a user to log in by providing a username and password.

# Organiser Endpoints
`GET /organiser/:id` : Get the detail of the organiser.  
`GET /orgMatches/:id` : Get the details of all the matches the organiser has created.  

# Team Endpoints
`POST /addPlayer/:id /teams`: Add player to the team.  
`GET /team/:id` : Get the detail of the team.  
`GET /teamMatches/:id` : Get the details of all the matches played by the team.

# Match Endpoints
`GET /match/:code` : Get the detail of particular match.  
`GET /startRoom/:code` : Starts the room match.  
`GET /createRoom/:id` : Creates a room under the organiser id(id) and generates a code.  
`GET /joinRoom/:code/:id` : Teams can join the room using the code.  
`GET /check/:code` : Gets the name of the teams that have joined the room.  
`GET /checkGameStatus/:code` : Checks the status of the game (Start/ongoing/ended).  
`GET /endGame/:code` : Ends the game.  
`POST /updateScore/:id` : Updates the score of the team and of each player.  

`The checks are done at the frontend, if the user is organiser or team. Accordingly specific routes were made available for them`

