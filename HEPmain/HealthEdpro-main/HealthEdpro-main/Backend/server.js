const connect = require("./connect")

const express = require("express")

const cors = require("cors")

const posts = require("./postRoutes")

const users = require("./userRoutes") 

require("dotenv").config()



const app = express()
const PORT = 3000




app.use(cors())

app.use(express.json())
app.use(posts)
app.use(users)



app.listen(process.env.PORT, () => {
  connect.connectToServer()
  console.log(`Server is running at port:${PORT}`);
})
