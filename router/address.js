const express=require("express")
const router=express.Router()
const address_handler=require('../router_handler/address')
router.get('/getAddress',address_handler.getAddress)
router.post('/addAddress',address_handler.addAddress)
router.post('/updateAddress',address_handler.updateAddress)
router.post('/deleteAddress',address_handler.deleteAddress)
module.exports=router