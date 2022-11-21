exports.getGoodDetail=(req,res)=>{
    console.log('id',req.query.id);
    res.send({
        price:100,
        name:'绿茶',
        imgUrl:'./images/goods1.jpg'
    })
}