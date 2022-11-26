const db=require('../db/index');
const jwt=require('jsonwebtoken')
const {sercet}=require('../config/jwtConfig');
//查询地址
exports.getAddress=(req,res)=>{
    // console.log(req.headers);
    // const tel=19157700167
    const {tel}=jwt.decode(req.headers.token)
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
    // console.log(req.body);
    const {tel}=jwt.decode(req.headers.token)
    console.log(tel);
    const {name,country,province,city,county,areaCode,postalCode,addressDetail,isDefault}=req.body
    const sql='insert into address set ?'
   if(isDefault){
            const sql1='select * from address where tel = ? and isDefault = 1';
            db.query(sql1,tel,(err,results)=>{
                if(err) throw err;
                if(results.length>0){
                    const sql2='update address set isDefault = 0  where tel = ?';
                    // console.log(results);
                   db.query(sql2,tel,(err,result)=>{
                    if(err) throw err
                    // console.log(result.affectedRows);
                    db.query(sql,{name,tel,country,province,city,county,areaCode,postalCode,addressDetail,isDefault},(err,results)=>{
                        if(err) throw err;
                        if(results.affectedRows===1){
                            res.send({
                                msg:'插入成功,并且修改默认地址',
                                code:200
                            })
                        }
                    })
                   })
            }
        }
            )
            
   }
   else{
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
}
   
//修改地址
exports.updateAddress=(req,res)=>{
    const {id,name,country,province,city,county,areaCode,postalCode,addressDetail,isDefault}=req.body;
    let {tel}=jwt.decode(req.headers.token);
    //先查询
    const sql='select * from address where id = ?'
    db.query(sql,id,(err,results)=>{
        if(err) throw err;
        if(results.length>0){
          const sql1='update address set ? where id = ?';
          db.query(sql1,[{name,country,province,city,county,areaCode,postalCode,addressDetail,isDefault},id],(err,results)=>{
            if(err){
                throw err
            }
            if(results.affectedRows!==1){
                return res.send({
                    msg:'修改出现问题',
                    code:500
                })
            }
            else{
                return res.send({
                    msg:'修改成功',
                    code:200
                })
            }
          })
        }
        else{
            return res.send({
                msg:'无数据',
                code:500
            })
        }
    })
    
}
//删除地址
exports.deleteAddress=(req,res)=>{
    let token=req.headers.token;
    let id=req.body.id;
    // console.log(req.body);
    let userInfo=jwt.decode(token);
    const sql='delete from address where id = ?';
        db.query(sql,id,(err,results)=>{
            if(err) throw err;
            if(results.affectedRows===1){
                return res.send({
                    msg:'删除成功',
                    code:200
                })
            }
            else{
                return res.send({
                    msg:'删除失败',
                    code:500
                })
            }
        })
}
