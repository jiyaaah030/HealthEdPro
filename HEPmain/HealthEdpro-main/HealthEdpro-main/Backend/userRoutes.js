const express = require("express")
const database = require("./connect")
const {ObjectId} = require("mongodb")
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')



//Retrive all data from database
let userRoutes = express.Router()

const SALT_ROUNDS = 6

 userRoutes.route("/users").get(async (request,response) => {
   let db = database.getDb()
   let data = await db.collection("users").find({}).toArray()

   if (data.length > 0) {
      response.json(data)
   }

   else {
    throw new Error("No users found")
   }
 })


 //Retrive one data from database


userRoutes.route("/users/:id").get(async (request,response) => {
  let db = database.getDb()
  let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) })

  if (Object.keys(data).length >0) {
     response.json(data)
  }

  else {
   throw new Error("No users found")
  }
})


 //Create one data in database
 userRoutes.route("/users").post(async (request,response) => {
  let db = database.getDb()

  const takenEmail = await db.collection("users").findOne({ email: request.body.email })
  
  if (takenEmail) {
    return response.json({success: false, message: "Email already exists"})
  }

  const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

  let mongoObject = {
   name: request.body.name,
   email: request.body.email,
   password: hash,  // Store the hashed password, not plain text
   joinDate: new Date()
  }
  let data = await db.collection("users").insertOne(mongoObject)

  response.json({success: true, data})
})



  //Update one data in database


  userRoutes.route("/users/:id").put(async (request,response) => {
    let db = database.getDb()
    let mongoObject = {
      $set: {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        joinDate: request.body.joinDate
      }
    }
    let data = await db.collection("users").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)
  
    response.json(data)
 
  })

  
  //Delete one data from database


userRoutes.route("/users/:id").delete(async (request,response) => {
  let db = database.getDb()
  let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) })

  response.json(data)
})



 //User Auth data in database


 userRoutes.route("/users/login").post(async (request,response) => {
  let db = database.getDb()

const user = await db.collection("users").findOne({ email: request.body.email })

if (user) {
let confirmation = await bcrypt.compare(request.body.password, user.password)
   if (confirmation) {
    const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "1h"})
    response.json({success: true, token})
   } else {
    response.json({success: false, message: "Invalid password"})
   }

} else {
  response.json({success: false, message: "user not found" })
}


})





module.exports = userRoutes