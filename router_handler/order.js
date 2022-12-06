const db=require('../db/index');
const jwt=require('jsonwebtoken')
const {sercet}=require('../config/jwtConfig');
exports.addOrder=(req,res)=>{
    const token=req.headers.token;
    const {tel}=jwt.decode(token);
    //订单数据
    const list=req.body;

    //生成订单号order_id,时间戳+6为随机数
    function setTimeDateFmat(s){
        return s<10 ? '0'+s:s
    }
    function randomNumber(){
        let now=new Date();
        let day=now.getDay();
        let month=now.getMonth()+1;
        let hours=now.getHours();
        let minutes=now.getMinutes();
        let seconds=now.getSeconds();
        month=setTimeDateFmat(month);
        day=setTimeDateFmat(day);
        hours=setTimeDateFmat(hours);
        minutes=setTimeDateFmat(minutes);
        seconds=setTimeDateFmat(seconds);
        let ordercode=now.getFullYear().toString()+month.toString()+day.toString()+hours.toString()+minutes.toString()+seconds.toString()+  (Math.round(Math.random()*1000000)).toString();
            return ordercode;
    }
    // 未支付：1
    // 待支付：2
    // 支付成功：3
    // 支付失败：4 | 0

    //商品列表名称
    let goodsName=[];
    //订单商品总金额
    let total_price=0;
    // 订单数量
    let goods_num=0;
    let order_id=randomNumber();
    list.forEach((v)=>{
        goodsName.push(v.name);
        total_price+=v.price*v.num;
        goods_num+=v.num;
    })
    const sql=`insert into store_order (order_id,goods_name,total_price,goods_num,order_status,tel) values('${order_id}','${goodsName}','${total_price}','${goods_num}','1','${tel}')`;
       db.query(sql,(err,results)=>{
        if(err) throw err;
       
        if(results.affectedRows!=0){
            const sql1='select * from store_order where tel = ?';
            db.query(sql1,tel,(err,results)=>{
                return res.send({
                    code:200,
                    msg:'添加订单成功',
                    data:results
                })
            })
           
        }
        else{
            return res.send({
                code:500,
                msg:'添加订单失败'
            })
        }
       }) 
    console.log(tel,list);
    // res.send('ok');

}
exports.selectOrder=(req,res)=>{
    const token=req.headers.token;
    const {tel}=jwt.decode(token);
    const {order_id}=req.query;
    const sql='select * from store_order where order_id = ?';
    db.query(sql,order_id,(err,results)=>{
        if(err) throw err
        if(results.length>0){
            return res.send({
                code:200,
                data:results
            })
        }
        else{
            return res.send({
                code:500,

            })
        }
    })
}