const db=require('../db/index');
const jwt=require('jsonwebtoken')
exports.addCart=(req,res)=>{
    console.log(req.headers.token);
    let token=req.headers.token
    const tel=jwt.decode(token).tel
    const id=req.body.id;
    console.log(tel,req.body);
    const sql='select * from goods where Gid = ?';
    db.query(sql,id,(err,results)=>{
        if(err) throw err;
    //    return res.send({
    //         data:results
    //     })
        const sql1='insert into goods_cart set ?';
        db.query(sql1,{Gid:id,...results[0],num:1,tel},(err,resu)=>{
            if(err) throw err;
            return res.send({
                msg:'插入成功'
            })
        })
    })
}
exports.queryCart=(req,res)=>{
    const token=req.headers.token;
    const tel=jwt.decode(token).tel;
    console.log(tel);
    const sql='select * from goods_cart where tel = ?';
    db.query(sql,tel,(err,results)=>{
        if(err) throw err;
        return res.send({
            msg:'查询成功',
            data:results
        })
    })
}
exports.updateNum=(req,res)=>{
    console.log(req.headers.token);
    console.log(req.body);
    const {num,cId} = req.body;
    const sql='update goods_cart set num = ? where cId = ?';
    db.query(sql,[num,cId],(err,results)=>{
        if(err) throw err;
        return res.send({
            msg:'修改成功',
        })
    })
}
exports.deleteCart=(req,res)=>{
    const token= req.headers.token
    const arrCart=req.body.arrCart;
    const {tel} = jwt.decode(token);
    const sql='delete from goods_cart where cId= ? and tel = ?';
    arrCart.forEach((v)=>{
        db.query(sql,[v,tel],(err,results)=>{
            if(err) throw err;
            return res.send({
                success:true,
                msg:'删除成功'
            })
        })
    })
}