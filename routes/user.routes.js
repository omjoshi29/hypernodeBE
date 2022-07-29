const {Router} = require("express")
const User = require("../models/user")
const category = require("../models/category")
const subcat = require("../models/subcat")
const Bot = require("../models/bot")

let userRouter = Router()

userRouter.get("/",async (req,res)=>{

//     let subs = new Bot({
//         server : "Hello user",
//         client : ""
//     })
// subs.save()
let data  = await category.aggregate([{$lookup:{from:"subcats",localField:"subcatid",foreignField:"_id",as:"subcats"}}])
 res.send(data)
})

module.exports = userRouter;

// {$push:{subcatid:el._id}}