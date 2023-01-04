# Movie-API

## Description

I developed this Movie_Api as part of my Full-Stack Web Development Course at CareerFoundry. 

### What technology usage and why?

This RESTful movie API combines backend (express, nodejs , mongodb) and frontend (react) and allowed me to get hands-on experience with the MERN stack. I chose this specific stack, because I had prior knowledge of JavaScript and using node.js and React would therefore be the best choice to combine backend and frontend.

### What does this application do?

This API allows a users to access a database to receive information on movies dealing with the topic of climate change. Also, the user can get background information on the movies such as information about the movies' directors and genre specifications. The user can sign up, update personal information and save/delete favorite movies to/from his personal profile.

### What challenges did I face, what did I learn? 

Being a beginner I obviously learned a lot from implementing this API. The most important learnings are:
* when working with multiple routes and endpoints, it is necessary to organize your project files (e.g. routes, models, middleware) and do division of concerns (use express.Router), summarize routes (via route chaining) and extract data to a separate file (extraction method on handlers) as much as possible. Otherwise, the index.js gets blown out of proportion.
* installing nodemon and an express error handler is very useful during development. Both save time.
* I am not sure, if Swagger is the best documentation software. Indentation and syntax errors are hard to spot and fix, a great amount of time goes into fulfilling YAML requirements for formatting.
* Visualizing the database in form of a schema before starting to fill it with content. Thus, inconsistencies become apparent right at the start and that avoids later extensive and error-prone refactoring.
* I used the non-relational database MongoDB, which doesn't have a predefined schema like postgreSQL. Though given the flexibility to omit certain keys, where unnecessary, I still stuck to a unified document-structure in order to avoid the side effect of messy, mismatched data and to not confuse the final user.
* Since I could not use primary and foreign keys - as I would have done in a relational database - I decided on using references (here: favorite movies of a user) to avoid redundant data.
* Before installing Homebrew (on a Mac) in order to use MongoDB, make sure to fulfill the system requirements for homebrew (https://docs.brew.sh/Installation). Otherwise, this can paralyze your progress for a day.
* when uploading data to HEROKU, it was necessary to use a format without a wrapping array and no commas between documents.
* when deploying to HEROKU the version of node.js should be 16.14.2, not higher. And also the binaries of the node.js and npm versions should match up. I specified the matching versions in the package.json.


## How to install and run the project ...

### ... as a developer, who wants to work with the project
1. Clone or download repository ...
```bash
git clone https://github.com/LisaPMunich/Movie-API.git
```


<img src="https://user-images.githubusercontent.com/99111208/163665039-d0a6011c-acff-4b35-97ec-7978a461c86d.png" alt="screenshot cloning or download">


3. install mongodb
```bash
npm install mongodb
```

4. Connect with own MongoDB (local or external)
define CONNECTION_URI as environment variable, otherwise it will connect to mongodb://localhost:27017/test


5. start the server
```bash
npm run start
```

### ... as a movie enthusiast, who wants to see the movies 
In order to use the application you have to register as a user at https://young-fjord-17804.herokuapp.com/users and then
https://young-fjord-17804.herokuapp.com/login to get the jwt token.

## Technical Requirements (according to project brief)

* MongoDB
* node.js, usage of package.json
* Express
* RESTful architecture
* usage of at least three middleware modules
* database: built with MongoDB
* business logic layer: modeled with Mongoose
* API return movies in JSON
* no code-errors
* testing in Postman
* security measures: code for user authentication, user authorization, data validation, meet data security regulations (GDPO)
* Deployment on GitHub
* Deployment on Heroku

### Project File Structure

Here is a quick breakdown of the project structure, in order to understand what part of the project I am referring to in the description of the following steps.

<img src="https://user-images.githubusercontent.com/99111208/163660927-d731ff61-d3ff-48ea-8ec5-f175c4b22292.png" alt="project file structure">

## Part I: Development Process of the Server-Side

### Installation of node.js and express

### Creation of HTTP endpoints and route handlers with subsequent testing in Postman

**Postman: Testing of endpoints**

<img src="https://user-images.githubusercontent.com/99111208/161479118-6014200c-aa61-4424-ba93-948936617e51.png" alt="Postman Testing">

### Documentation

**Swagger: Writing documentation of endpoints**

<img src="https://user-images.githubusercontent.com/99111208/168456198-8d1f2c68-1c29-4783-a275-bb1bae0622a7.png" alt="swagger documentation">

### Installation of all dev dependencies and express middleware for development

See the dependencies listed in the package.json:

<img src="https://user-images.githubusercontent.com/99111208/163407526-030def0e-1628-4f60-b5ed-9764be80939e.png" alt="package json displaying dependencies">

### Create and populate non-relational database MongoDB

* use database schema diagram to sketch structure of database, division into two collections ("movies" and "users").
* installing mongo shell
* use Mongo Shell to create database with CRUD operations
* Create the 2 collections "movies" and "users".
* Add 10 documents to the "movies" collection (including embedded documents for the keys "genre" and "director").
* In the "users" collection - consisting of 4 documents - references are used to store information about the user's favorite movies.

### Building models with Mongoose (Business Logic)

Use Mongoose to build the Business Logic Layer linking the database from MongoDB to the server (and finally to the Web Browser).

Process:
* Installation of object model driver Mongoose
* Installation of dependencies: jsonwebtoken (jwt), bcrypt
* Configuring the schemata for the users and the movies collection
* Creation of the Models in a separate models.js file
* Exporting the models to index.js
* Rewriting the CRUD operations to query the mongoose models
* Integrating Mongoose with the REST API
* Apply local and jwt authentication methods
* Test the endpoints in Postman

<img src="https://user-images.githubusercontent.com/99111208/162483313-eeab363f-be89-4493-a05f-f1abfe9896f3.png" alt="Postman documentation">

* rewrite the Swagger documentation

<img src="https://user-images.githubusercontent.com/99111208/162483329-578dba1f-2b50-4cd3-9f52-7b9849a6917d.png" alt="Swagger documentation overview">

<img src="https://user-images.githubusercontent.com/99111208/162483322-147bb2e2-1e4d-4554-b909-d1987091a02a.png" alt="Swagger documentation detail1">

<img src="https://user-images.githubusercontent.com/99111208/162483324-7accde1e-e3a1-43c1-9212-56eb33dd10ce.png" alt="Swagger documentation detail2">

## Data Security

### Authentication in Node.js/Express using Passport

* Implement basic HTTP authentication for initial login requests
* implement login query with generation of JWT token, see screenshot below demonstration working endpoint in Postman:

<img src="https://user-images.githubusercontent.com/99111208/162905239-a86a61ae-ff22-4410-8c8e-4a397dbf5436.png" alt="Screenshot Postman with POST endpoint for login">

* Update Swagger documentation

<img src="https://user-images.githubusercontent.com/99111208/162905204-e4b60cd9-b123-4f71-9ce1-197a0d6c074e.png" alt="Screenshot Swagger documentation updated">

### Implementation of Security Measures for Backend

* CORS in Express (set to allow for all origins)
* Bcrypt for Password hashing (see screenshot)

<img src="https://user-images.githubusercontent.com/99111208/163310983-1f30f9be-dd62-4c70-afef-72acfcec781b.png" alt="Screenshot successful password hashing">

* Express-Validator for server-side data input validation

<img src="https://user-images.githubusercontent.com/99111208/163312208-f2e15c6e-30d6-4ae8-b61f-b1221d045922.png" alt="Screenshot test of successful data validation in endpoint POST '/users/{Name}/movies/{Title}">

* Adjust Environment variable to not reveal Connection URI

<img src="https://user-images.githubusercontent.com/99111208/163313326-2c05fa2f-185f-4da8-91e5-04b3bbc79629.png" alt="Screenshot adjusting environment variable on HEROKU">

<img src="https://user-images.githubusercontent.com/99111208/163313342-ecbf4ff4-de6e-47c9-85e3-755742e8c9c7.png" alt="Screenshot adjusting environment variable in code">


## Hosting on MongoDBAtlas (DBaaS) and HEROKU (PaaS)

### Steps

* register with heroku, install toolbelt
* change port
* create Heroku app
* create mongodb instance on MongoDBAtlas
* export MongoDB database with mongodump (each collection as json, without commas between documents, not arrays)
* push Git main to Heroku

### Troubleshooting of deployment process to HEROKU

* add version of node.js (16.14.2) to package.json,
* change HEROKU version from 20 to 18
* remove programming/ code errors (reference HEROKU documentation)
 

## Deployment to HEROKU - FINALLY

<img src="https://user-images.githubusercontent.com/99111208/163316015-6b1cf16d-9469-4f92-85ee-0957de9e3ab2.png" alt="Screenshot app finally online on Heroku">


