const express=require("express")
const router=express.Router()
const address_handler=require('../router_handler/address')
const cart_handler=require('../router_handler/cart')
router.post('/addCart',cart_handler.addCart);
router.get('/queryCart',cart_handler.queryCart);
router.post('/updateNum',cart_handler.updateNum);
router.post('/deleteCart',cart_handler.deleteCart);
module.exports=router