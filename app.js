const express=require('express')
const app=express()
const cors=require('cors')
const userRouter=require('./router/user')
const firtPageRouter=require('./router/firstPage')
const goodsList=require('./router/ListPage')
const goodDetail=require('./router/Detail')
const shopList=require('./router/goods')
const bodyParser = require('body-parser');//用于req.body获取值的
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())
app.use(goodDetail)
app.use(shopList)
app.use('',firtPageRouter)
app.use('/user',userRouter)
app.use('',goodsList)
app.get('/', function (req, res) {
    res.send('Hello World');
 })
app.listen('3007',()=>{
    console.log('api server running at http://127.0.0.1:3007')

})