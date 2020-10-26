# Puppy Pals

Deployed to GKE [here](http://35.246.106.18/)

Is your doggy feeling lonely, sad, or just missing that special somebody? 
Why not get them on Puppy Pals and they'll be meeting that next adorable play date before you know it!

Match with other dogs based on their Size, Age, Breed and dashing good looks!

## Table of content

- [Installation](#installation)
- [Database](#database)
- [Running the application](#running-the-application)
- [Tech stack](#tech-stack)

## Tech stack

- JavaScript
- React
- Redux
- Node
- Express
- MongoDB
- AWS S3
- Docker
- Kubernetes
- GKE

## Installation

### Backend

Follow these steps to install the required dependencies:

1. From the root of the project, cd into server and type the following in your terminal:

```
$ npm install
```

That's it for the backend!

### Frontend

Follow these steps to install required dependencies:

1. From the root of the project, cd into client and type the following in your terminal:

```
$ npm install
```

Great! Your full-stack is ready!

## Database

You will need to sign up to MongoDB and create a cluster.

Once you have created a cluster, you will need to find what the connection URI is.

Click on connect when viewing your cluster and a model should pop up with 3 options. click on "Connect your application" to see your MongoURI.

To be able to store images you will need to create AWS S3 bucket.

After that you will need to save secret keys as environment variables.

1. Create a .env file in the server folder
2. Create an Envrionment called ATLAS_URI with your MongoURI - Like this: ATLAS_URI="[ENTER_YOUR_MONGOURI_HERE]"
3. Create environmental variables to have an access to your AWS bucket: AWS_BUCKET_NAME, AWS_REGION, AWS_BUCKET_URL


## Running the application

To run the Server and application at the same time from the server folder run:

```
$ npm run dev
```

and That's it! Now feel free to play around with the application on localhost 3000.

## Planning

This was a pair project completed by Two Makers Academy Graduates:

- [Daria Thompson](https://github.com/dariathompson)
- [Patrick Oliver](https://github.com/poliver24)

The aim of this project was to work together to build our skills on the MERN Stack (MongoDB, Express, React, Node), and to further out proficiency in React and Redux. 
Both being newcomers to MongoDB and NoSQL we saw this as the perfect opportunity to cover some knowledge gaps on some of widely used technology. 

It helps that we also both love Dogs!
