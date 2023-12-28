const express = require("express");

// importing routes
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Server is up and running.."
    })
})

/**
 *  to set up routes for different parts of your application using Express.js
 * In summary, these lines are a way to modularize your route handling by assigning specific routers to handle different parts of your API.
 *  This can make your code more organized and easier to maintain, 
 * especially as your application grows and you have multiple endpoints to manage.
 */
app.use("/users",userRouter);
app.use("/books", booksRouter);


app.all("*", (req,res)=>{
    res.status(500).json({
        message: "This route does not exist"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})