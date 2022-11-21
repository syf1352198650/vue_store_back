const express=require("express")
const router=express.Router()
const GoodsList_handler=require('../router_handler/ListPage')
router.get('/getGoodsList',GoodsList_handler.getGoodsList)
module.exports=router