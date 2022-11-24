const express=require("express")
const router=express.Router()

const shop_handler=require('../router_handler/goods')
router.get('/getShopList',shop_handler.getShopList)
module.exports=router