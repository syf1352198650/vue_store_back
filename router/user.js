const express=require("express")
const router=express.Router()
const user_handler=require('../router_handler/user')

router.post('/addUser',user_handler.addUser)
router.post('/login',user_handler.login)
router.post('/getShortMessage',user_handler.getShortMessage)
router.post('/registerUser',user_handler.registerUser)
module.exports=router