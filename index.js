const express = require("express")
const{users} = require("./data/users.json")
const {books} = require("./data/books.json")
const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/",(req, res)=>{
    res.status(200).json({
        message: "server is up and running"
    })
})

/**
 * Route: /users
 * Method: GET
 * description: get all users 
 * Access : Public
 * parameters: none
 */

app.get("/users", (req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})

app.all("*", (req, res)=>{
    res.status(500).json({
        message:"This route doesnot exist"
    })
})

app.listen(PORT, ()=>{
    console.log('Server is running on PORT ${PORT}')
})