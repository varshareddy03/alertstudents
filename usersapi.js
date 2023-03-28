const { application, request, response } = require("express");
const exp = require("express");
const expressAsyncHandler = require("express-async-handler");
const userApp = exp.Router()
const jwt = require('jsonwebtoken')

//body parser
userApp.use(exp.json())

//importing bcryptjs
const bcryptjs = require("bcryptjs")

//getting all users
userApp.get('/get-users', expressAsyncHandler(async(request, response) => {

    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get users from db
    let usersList = await usersCollectionObject.find().toArray();

    //send result
    response.status(200).send({message:"List of users", payLoad: usersList})
}))

//get user by username
userApp.get('/get-user/:username', expressAsyncHandler(async(request, response) => {

    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get name of user
    let usernameFromUrl = request.params.username

    //find the user by username
    const userOfDb = await usersCollectionObject.findOne({username: usernameFromUrl})

    if(userOfDb == null)
    {
        response.status(200).send({message:"User not found"})
    }
    else
    {
        //remove password from user
        delete userOfDb.password;

        //send response
        response.status(200).send({message: "User", payLoad: userOfDb})
    }
}))

//creating a new user
userApp.post('/user-signup', expressAsyncHandler(async(request, response) => {
    

    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get newUser from request
    const newUser = request.body;

    //console.log("New user", newUser)

    //checking for duplicate user
    let userOfDB = await usersCollectionObject.findOne({email: newUser.email})

    //send response if user already exists
    if(userOfDB != null)
    {
        //console.log("Not null", userOfDB)

        response.status(200).send({message: "user already exists !!"})
    }
    //if user does not exist
    else
    {
        //console.log("null")
        //hash the password
        let hashedPassword = await bcryptjs.hash(newUser.password, 5)

        //replace password with hashed password
        newUser.password = hashedPassword

        //insert the user
        await usersCollectionObject.insertOne(newUser)

        //sending response
        response.status(201).send({message: "User created"})
        //console.log("User created")
        //console.log("USer", newUser)
    }
}))

//user login
userApp.post('/user-login', expressAsyncHandler(async(request, response) =>{
    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get newUser from request
    const userCredObj = request.body;

    //verify username
    let userofDB = await usersCollectionObject.findOne({email:userCredObj.email})

    //if email is not valid
    if(userofDB === null)
    {
        response.status(200).send({message:"Invaid user"})
    }
    //if user is valid
    else{

        //verify password
        let isEqual = await bcryptjs.compare(userCredObj.password, userofDB.password)

        //if not matched
        if(isEqual === false)
        {
            response.status(200).send({message:"Invalid password"})
        }
        //if matched
        else{
            //create a jwt token
            let jwtToken = jwt.sign({email:userofDB.email}, 'abcdef',{expiresIn:20})

            //send token in response
            response.status(201).send({message:"success", token:jwtToken, user:userofDB})
        }
    }
}))

//update existing user
userApp.put('/update-user', expressAsyncHandler(async(request, response) => {

    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get new user
    let modifiedUser = request.body

    //hash the password
    let hashedPassword = await bcryptjs.hash(modifiedUser.password, 5)
    modifiedUser.password = hashedPassword

    //update existing user
    let result = await usersCollectionObject.updateOne({username: modifiedUser.username}, {$set:{...modifiedUser}})
    if(result.modifiedCount === 1 )
        response.status(200).send({message:"User modified"})
    else
        response.status(200).send({message:"User not modified"})

}))

//deleting user
userApp.delete('/delete-user/:username', expressAsyncHandler(async(request, response) => {

    //get user collection object
    const usersCollectionObject = request.app.get('usersCollectionObject')

    //get username from url
    let usernameFromUrl = request.params.username

    //deleting user
    let result = await usersCollectionObject.deleteOne({username: usernameFromUrl})

    //sending response
    if(result.deletedCount == 1)
        response.send({message:"User deleted"})
    else
        response.send({message:"User to be deleted not found !!"})

}))

module.exports = userApp;



