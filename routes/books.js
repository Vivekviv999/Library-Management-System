const express = require("express");

// JSON data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");


const {UserModel, BookModel} = require("../models");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book-controller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */

// router.get("/",(req,res)=>{
//    res.status(200).json({
//     success: true,
//     data:books
//    })
// })

router.get("/",getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get single book by id
 * Access: Public
 * Parameters: id
 */

// router.get("/:id",(req,res)=>{
//     const{id} = req.params;

//     const book = books.find((each)=>each.id === id)

//     if(!book)
//     return res.status(404).json({
//        success: false,
//        message:"Book not found"
//  })

//  return res.status(200).json({
//     success: true,
//     data: book
//  })
// })

router.get("/:id",getSingleBookById)

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
// 
// router.get("/issued/books",(req,res)=>{
//     const userWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook) return each;
//     })

//     const issuedBooks = [];

//     userWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id === each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })
//     if(issuedBooks.length===0)
//     return res.status(404).json({
//       success:false,
//       message: "no issued book yet"
// })
//     return res.status(200).json({
//         success:true,
//         data:issuedBooks
//     })
// })

router.get("/issued/books",getAllIssuedBooks)

/**
 * Route: /b00ks
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 */


// exports.addNewBook = async (req, res) => {
//     const {data} = req.body;

//     if(!data){
//         return res.status(404).json({
//             success: false,
//             message: "No data provided"
//         })
//     }

//     await BookModel.create(data);

//     const allBooks = await BookModel.find();

//     return res.status(201).json({
//         success: true,
//         data: allBooks
//     })
// }

router.post("/", addNewBook)

/**
 * Route: /:id
 * Method: PUT
 * Description: Update a Book
 * Access: Public
 * Parameters: Id
 */
// router.put("/:id",(req,res)=>{
//     const{id}= req.params;
//     const{data}= req.body;
//     const book = books.find((each)=>each.id === id);
//     if(!book){
//         return res.status(200).json({
//             success: false,
//             message: "Books not found"
//         })
//     }
//       const updatedBook = books.map((each)=>{
//         if(each.id===id){
//             return {
//                 ...each,
//                 ...data
//             };
//         }
//         return each
//     })
//     return res.status(200).json({
//         success: true,
//         data: updatedBook
//     })
// })
router.put("/:id", updateBookById)



module.exports = router;