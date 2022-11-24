const db=require('../db/index');
exports.getShopList=(req,res)=>{
   console.log(req.query);
   let sql='';
   const {searchName,order}=req.query;
   const orderBy=Object.keys(order)[0];
   const orderType=Object.values(order)[0];
   if(orderBy=='zh'){
   sql= `select * from goods where name like '%${searchName}%'`;
   }
   else{
   sql=`select * from goods where name like '%${searchName}%' order by ${orderBy} ${orderType}`;
   }
   


   db.query(sql,(err,results)=>{
    
    if(err) throw err;
    if(results.length>0){
       return res.send({
                msg:'查询成功',
                data:results
                
        })
    }
    else{
        return res.send({
            msg:'暂无数据',
            data:[]
        })
    }
   })
   
}