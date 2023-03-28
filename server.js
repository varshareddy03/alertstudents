//creating express app
const exp = require("express")
const app = exp()
const cors = require('cors')

//assign port number
app.listen(3500, () => console.log("Server listening on port number 3500..."))

app.use(cors())

//get mongo client
const mclient = require("mongodb").MongoClient

//connect db server using mongo client
mclient.connect("mongodb://127.0.0.1:27017/sampledb")
.then((dbRef) => {

    //create db object
    const dbObj = dbRef.db("sampledb")

    //connect to collections of database
    const usersCollectionObject = dbObj.collection("userscollection")

    //share collection to API
    app.set('usersCollectionObject', usersCollectionObject)

    //displaying message
    console.log("DB connection success")
})
.catch((err) => console.log("Database connection error is ", err));

//import userapp
const userApp = require('./usersapi')
//console.log("server.js")
app.use('/user-api', userApp)

//error handling middleware
const errhandlingMiddleware = (error, request, response, next) => {
    response.send({message: "Error ocuured", errmsg: error.message})
}
app.use(errhandlingMiddleware)

//invalid path handling middleware
const invalidPathMiddleware = (request, response, next) => {
    response.send({message: 'Invalid Path'})
}
app.use("*", invalidPathMiddleware)
