const db=require('../db/index');
//查询地址
exports.getAddress=(req,res)=>{
    console.log(req.headers);
    const tel=19157700167
    const sql='select * from address where tel = ?'
    db.query(sql,tel,(err,results)=>{
        if(err) throw err;
        return res.send({
            code:200,
            data:results
        })
    })
}
// 添加地址
exports.addAddress=(req,res)=>{
    console.log(req.body);
    const {name,tel,country,province,city,county,areaCode,postalCode,addressDetail,isDefault}=req.body
    const sql='insert into address set ?'
    db.query(sql,{name,tel,country,province,city,county,areaCode,postalCode,addressDetail,isDefault},(err,results)=>{
        if(err) throw err;
        if(results.affectedRows===1){
            res.send({
                msg:'插入成功',
                code:200
            })
        }
    })
}
//修改地址
exports.updateAddress=(req,res)=>{
    console.log(req.body);
    return res.send({
        msg:'修改成功'
    })
}
