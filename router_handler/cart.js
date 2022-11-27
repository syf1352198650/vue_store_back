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
        db.query(sql1,{Gid:id,...results[0],num:1},(err,resu)=>{
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
    const sql='select * from goods_cart where tel = ?';
    db.query(sql,tel,(err,results)=>{
        if(err) throw err;
        return res.send({
            msg:'查询成功',
            data:results
        })
    })
}