const express=require("express")
const router=express.Router()
const user_handler=require('../router_handler/user')


router.get('/login',user_handler.login)

module.exports=router