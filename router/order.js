const express=require("express")
const router=express.Router()
const order_handler=require('../router_handler/order')
router.post('/addOrder',order_handler.addOrder);
router.get('/selectOrder',order_handler.selectOrder)
module.exports=router