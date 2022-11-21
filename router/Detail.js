const express=require("express")
const router=express.Router()
const detailPage_handler=require('../router_handler/Detail')
router.get('/getGoodDetail',detailPage_handler.getGoodDetail)
module.exports=router