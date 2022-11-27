const express=require("express")
const router=express.Router()
const address_handler=require('../router_handler/address')
const cart_handler=require('../router_handler/cart')
router.post('/addCart',cart_handler.addCart)
module.exports=router