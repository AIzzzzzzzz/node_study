const db = require('../db/index')
const sql = 'select username from users where id=?'
exports.updateAvatar = (req, res) => {
    res.send('头像')
}



exports.getUserInfo = (req,res)=>{
    
    
    db.query(sql,req.auth.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('失败用户信息')
        res.send({
            status:'1',
            message:'获取用户信息成功',
            date:result[0]
        })
    })
}