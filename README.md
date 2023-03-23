# NoSQL-Challenge-Social-Network-API

![](https://img.shields.io/badge/Made%20by%20Fabien-Mac-green)  
![](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB)  ![](https://img.shields.io/badge/npm%20package-express-orange?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-mongoose-cyan?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)
 ## Table of Contents:  
[1. Description](#Description)  
[2. Acceptance Criteria](#Acceptance-Criteria)  
[3. Walkthrough Videos](#Walkthrough-Videos)  
[4. Installation](#Installation)  
[5. Tests](#Tests)  
[6. License Details](#License-Details)  
[7. Submission](#Submission)   
[8. Questions](#Questions)  
## Description:
We developed a set of APIs for a social network that utilizes a MongoDB database, Express.js for routing, Mongoose ODM.

## Acceptance Criteria:

- When you enter the command to invoke the application then the server is started and the Mongoose models are synced to the MongoDB database.  
- Testing API GET routes in Insomnia Core for users and thoughts return the data for each of these routes in a formatted JSON
- Testing API POST, PUT, and DELETE routes in Insomnia Core are able to successfully create, update, and delete users and thoughts

- Testing API POST and DELETE routes in Insomnia Core are able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

## Walkthrough Videos(https://clipchamp.com/watch/Wr6CWFaJ1oK)  


## Installation:
This repo is not to be deployed, if you wanted to, you could by doing the following:  
1. The repo files can be downloaded from the following link

2. MongoDB must be installed on your computer

3. At the command line, run the following:
```
    - npm init -y
    - npm install express
    - npm install mongoose
    - npm install moment
```
4. Start the server
```
    $ npm start
```
5. Open Insomnia Core to test API routes

## Tests:  

Testing restful API calls with Insomnia Core  

---
**`/api/users`**
* `GET` all users
* `POST` a new user:
    ```json
    // example data
    {
        "username": "Messi",
        "email": "Messi@gmail.com"
    }
    ```
---
**`/api/users/:userid`**
* `GET` a single user by its `_id` 
* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`
---
**`/api/users/:userId/friends/:friendId`**
* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list
---
**`/api/thoughts`** 
* `GET` to get all thoughts
* `POST` to create a new thought
    ```json
    // example data
    {
    "thoughtText": "Here's a cool thought...",
    "username": "Ronaldo",
    "userId": "5edff358a0fcb779aa7b118b"
    }
    ```
---
**`/api/thoughts/:thoughtId`**
* `GET` to get a single thought by its `_id`
* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`
---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction 
    ```json
    // example data
    {
    "reactionBody":"Hell Yeah!!",
    "username":"Benzema"
    }
    ```
---
**`/api/thoughts/:thoughtId/reactions/:reactionId`**
* `DELETE` remove a reaction by the `reactionId` 

## License Details: 
 This project is under no license.  

## Submission:
 [Github repository](https://github.com/Fabitheguy003/NoSQL-Challenge-Social-Network-API)

## Questions:
 Here is a link to my github:  
https://github.com/Fabitheguy003  
 Email me at:  
Fabienmukungu@gmail.com  
for additional questions