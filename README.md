# **SHOP-E**
# Table of contents
1. [Introduction](#introduction)
2. [Development Stages](#development-stages)
3. [Learning Objectives](#learning-objectives)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Installation Steps](#installation-steps)
## *Introduction*

An online shopping app built with a focus on backend technologies utilizing Node.js with Express

___
## Development Stages.

### 1. Planning

* After analyzing the market needs ,such as transport, availability in areas
e.t.c, the following requirements arise:
  * Registration of users
  * Authenticating users
  * Shop registrations for sellers
    * Shop inventory management
    * Ratings
  * Shopping cart management
  * Customer reviewing
  * Chatting system
  * Package tracking

### 2. Design
* Create the mockups of the frontend system
* Select [technology stack](#technology-stack)
* Design database schema

### 3. Development
* Create the [project structure](#project-structure)
* Develop in modular approach:
  * CRUD operations
  * Restful APIs
  * Frontend UI
  * Authentication and Authorization management

### 4. Testing
* Unit testing on components using Jest, postman e.t.c
* Frontend testing on different view sizes
* Security testing
___
## Learning Objectives
* Learn backend development using JavaScript programming language
* Developing secure systems
* Designing RDBMS
* RESTful API designing
* Project management
___
## Technology Stack
### Frontend
* HTML
* CSS
* JavaScript
### Backend
* Node.js
* Express.js
### Database
* MySQL
### Testing
* Jest
* Postman
___
## Project Structure
```
Project root/
    backend/
        controllers/ # Manage CRUD operations on models
        database/ # The connectivity to a database server
        routes/ # The routes for a REST API
        repository/ # Layers that interacts directly with the dataase
        scripts/ # SQL scritps to create database
        services # Layers that work together with repository for CRUD operations
        models/ # The entities in the database
        .env/ # File containing environment variables such as passwords
    frontend/
        templates/ # HTML pages
        public/
            JS/ # Javascript files
            CSS/ # CSS stylesheet
            Images/ # Images rendered
    app.js - The main starting point of the service
    package-lock.json
    package.json
```
___
## Installation steps
### Requirements
* Node.js (v18.19.1 +)
* MySQL Server
* Npm
### Procedure
1. Clone the repository
```
git clone https://github.com/Jim-03/shop-e
```
2. Install dependencies
```
cd shop-e
npm install
```

3. Create a .env file with the following content:
```
DB_DIALECT=your dialect e.g mysql
DB_NAME=the name of the database e.g online_shopping
DB_USER=you username e.g online_shop_user
DB_PASS=your password e.g strong_password
DB_HOST=your host service e.g localhost
DB_PORT= the port of the server e.g 3306
```
4. Run the application
```
npx nodemon app
```
The output should contain `Connected to the database successfully` on a successful startup
## Contact
* Name: Jimmy Chemuku
* Phone: +254742228769
* Email: [jimmycn03@gmail.com](mailto:jimmycn03@gmail.com)
* GitHub: [Jim-03](https://github.com/Jim-03)