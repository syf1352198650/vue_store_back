const express=require("express")
const router=express.Router()
const firstPage_handler=require('../router_handler/firstPage')
router.get('/getFirtPageIndex_0',firstPage_handler.getRecommendList)
router.get('/getFirtPageIndex_1',firstPage_handler.getFirtPageIndex_1)
module.exports=router