const express = require("express");

// JSON data import
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id",(req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */
router.post("/", (req, res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each)=> each.id === id);

    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exist with the given Id"
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: users
    })
})
//we can use this logic also
// router.post("/", (req, res) => {
//     const { data } = req.body;

//     if (!data) {
//         return res.status(404).json({
//             success: false,
//             message: "No Data provided"
//         });
//     }

//     const user = users.find((each) => each.id === data.id);

//     if (user) {
//         return res.status(404).json({
//             success: false,
//             message: "User already exists with the given Id"
//         });
//     }

//     const allUsers = [...users, data];

//     res.status(201).json({
//         success: true,
//         data: allUsers
//     });
// });
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating User By id
 * Access: Public
 * Parameters: none
 */
router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    const updatedUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
        return each
    })
    return res.status(200).json({
        success: true,
        data: updatedUser
    })
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting User By id
 * Access: Public
 * Parameters: none
 */

router.delete("/:id",(req,res)=>{
    const {id}= req.params;
    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    const index =users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success:true,
        data: users
    })
})

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: GET all user Subscription details
 * Access: Public
 * Parameters: Id
 */

router.get("/subscription-details/:id",(req,res)=>{
    const{id}= req.params;
    const user = users.find((each)=> each.id === id)
    if(!user){
      return  res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    const getDateInDays = (data = "")=>{
        let date;
        if(data === ""){
            //current data
            date = new Date();
        }else{
            // getting date on basics of variable
            date = new Date(data);
        }
        let days = Math.floor(date/(1000*60*60*24))
        return days;
    }
   const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

    //subscription  expiration calc
    //jan 1 1970 //millisecond
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);
  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
 return  res.status(200).json({
    success: true,
    data,   
 })
})


module.exports = router;