const mysql=require('mysql')

const db=mysql.createPool({
    host: 'localhost',
    user: 'vue_store',
    password: 'Syf201314',
    database: 'vue_store'
})
module.exports=db