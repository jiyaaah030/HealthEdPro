const express = require("express")
const database = require("./connect")
const {ObjectId} = require("mongodb")
const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./config.env"})



//Retrive all data from database
let postRoutes = express.Router()

 postRoutes.route("/posts").get( async (request,response) => {
   let db = database.getDb()
   let data = await db.collection("posts").find({}).toArray()

   if (data.length > 0) {
      response.json(data)
   }

   else {
    throw new Error("No posts found")
   }
 })


 //Retrive one data from database


postRoutes.route("/posts/:id").get( async (request,response) => {
  let db = database.getDb()
  let data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) })

  if (Object.keys(data).length >0) {
     response.json(data)
  }

  else {
   throw new Error("No posts found")
  }
})


 //Create one data in database


 postRoutes.route("/posts").post( async (request,response) => {
   let db = database.getDb()
   let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    dataCreated: request.body.dataCreated
   }
   let data = await db.collection("posts").insertOne(mongoObject)
 
   response.json(data)

 })



  //Update one data in database


  postRoutes.route("/posts/:id").put( async (request,response) => {
    let db = database.getDb()
    let mongoObject = {
      $set: {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        dataCreated: request.body.dataCreated
      }
    }
    let data = await db.collection("posts").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)
  
    response.json(data)
 
  })

  
  //Delete one data from database


postRoutes.route("/posts/:id").delete( async (request,response) => {
  let db = database.getDb()
  let data = await db.collection("posts").deleteOne({ _id: new ObjectId(request.params.id) })

  response.json(data)
})



function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"]
  const token = authHeaders && authHeaders.split(" ")[1]

  if (!token) {
    return response.status(401).json({message: "Authentication token is missing"})
  }
  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({message: "Invalid token"})
    }
    request.body.user = user
    next()
  })
}



module.exports = postRoutes