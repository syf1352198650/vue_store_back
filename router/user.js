const express=require("express")
const router=express.Router()
const user_handler=require('../router_handler/user')

router.post('/addUser',user_handler.addUser)
router.post('/login',user_handler.login)
router.post('/getShortMessage',user_handler.getShortMessage)
router.post('/registerUser',user_handler.registerUser)
router.post('/queryTel',user_handler.queryTel)
router.post('/updatePwd',user_handler.updatePwd)
module.exports=router