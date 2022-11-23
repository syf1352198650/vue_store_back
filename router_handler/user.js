const db=require('../db/index');
const jwt=require('jsonwebtoken')
const QcloudSms = require("qcloudsms_js");
const {sercet}=require('../config/jwtConfig');
exports.updatePwd=(req,res)=>{
  const {tel,pwd}=req.body
  console.log(pwd,tel);
  const sql= `select * from user where tel = '${tel}'`;
  db.query(sql,(err,results)=>{
    if(results.length>0){
      const sql1=`update user set pwd = '${pwd}'`;
      db.query(sql1,(err,results)=>{
        if(err) {
          throw err
        }
        if(results.affectedRows>0){
            return res.send({
              code:200,
              msg:'修改成功'
            })
        }
        else{
          return res.send({
            code:600,
            msg:'修改失败'
          })
        }
      })
    }
    else{
      return res.send({
          code:500,
          msg:'用户不存在'
      })
    }
  })
}
exports.queryTel=(req,res)=>{
  console.log(req.body);
  const tel=req.body.tel;
  const sql='select * from user where tel = ?';
  db.query(sql,tel,(err,results)=>{
    if(err) throw err
    if(results.length>0){
     return res.send({
        code:200,
        msg:'手机号存在',
      })
    }
    return res.send({
      code:600,
      msg:'手机号不存在'
    })
  })
}
exports.registerUser=(req,res)=>{
  console.log(req.body);
  const params=req.body
  const sql='select * from user where tel = ?'
  //判断用户是否存在
  db.query(sql,params.tel,(err,results)=>{
    if(err) throw err;
    //用户存在
    if(results.length>0){
      return res.send({
        code:200,
        data:{
					success:true,
					msg:'登录成功',
					data:results[0]
				}
      })
    }
    else{
      //不存在 增加一条数据
      let payload={tel:params.tel};
      let token=jwt.sign(payload,sercet,{expiresIn:60});
      const sql='insert into user set ?'
      db.query(sql,{tel:params.tel,pwd:params.pwd,token:token,imgUrl:'/images/user.jpeg'},(err,result)=>{
          if(err) throw err;
          if(result.affectedRows>0){
            res.send({
              code:200,
              data:{
                success:true,
                msg:'注册成功，添加成功',
                data:result[0]
              }
            })
          }
      })
    }
  })
}
exports.login=(req,res)=>{
 let params=req.body;
 let payload={tel:params.tel}
 
 let token=jwt.sign(payload,sercet,{expiresIn:60})
 
  const sql= `select * from user where tel = ?`;
  db.query(sql,params.tel,(err,results)=>{
    //手机号存在
    if(results.length>0){
      let id= results[0].id;
      if(results[0].pwd==params.pwd){
        const sql= `update user set token = ${token} where id = ${id}`
        db.query(sql,()=>{
             //手机号和密码都对
             res.send({
              code:200,
              data:{
                success:true,
                msg:'登录成功',
                data:results[0]
              }
            })
        })
      }
      else{
         //密码不对
					res.send({
						code:302,
						data:{
							success:false,
							msg:'密码不正确'
						}
					}) 
      }
    }else{
      //不存在
			res.send({
				code:301,
				data:{
					success:false,
					msg:'手机号不存在'
				}
			})
    }
  })
}
exports.getShortMessage=(req,res)=>{
  let tel = req.body.tel;
  // 短信应用SDK AppID
	let appid = 1400187558;  // SDK AppID是1400开头
	
	// 短信应用SDK AppKey
	let appkey = "dc9dc3391896235ddc2325685047edc7";
	
	// 需要发送短信的手机号码
	let phoneNumbers = [tel];
	
	// 短信模板ID，需要在短信应用中申请
	let templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
	
	// 签名
	let smsSign = "syf的vue_store";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
	
	// 实例化QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
	    if (err) {
	        console.log("err: ", err);
	    } else {
			res.send({
				code:200,
				data:{
					success:true,
					data:ress.req.body.params[0]
				}
			})
      
	    }
	}
	
	let ssender = qcloudsms.SmsSingleSender();
	//这个变量：params 就是往手机上，发送的短信
	let params = [  Math.floor( Math.random()*(9999-1000))+1000   ];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
 
}
exports.addUser=(req,res)=>{
  const tel=req.body.tel;
  const pwd=req.body.pwd ||'666666';
  //用户信息
  let userinfo={tel:tel};
  let token=jwt.sign(userinfo,sercet,{expiresIn:60})
  const sql1='select * from user where tel = ?';
  db.query(sql1,tel,(err,results)=>{
    if(err) throw err;
    //用户存在
    if(results.length>0){
      return res.send({
        code:200,
        data:{
          success:true,
          mes:'登录成功',
          data:results[0]
        }
      })
    }else{
      const sql='insert into user set ?';

      db.query(sql,{tel:tel,pwd:pwd,token:token,imgUrl:'/images/user.jpeg'},(err,results)=>{
        if(err) return res.send({
          code:500,
          success:err
        })
        if(results.affectedRows!==1){
          return res.send({
            code:500,
            success:err
          })
        }
        return res.send({
          code:200,
          success:true
        })
      })
    }
  })
  
}