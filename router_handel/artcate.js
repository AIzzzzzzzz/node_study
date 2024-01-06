const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')


const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

exports.getartcate = (req, res) => {
    db.query(sql, (err, result) => {
        if (err) return err.message
        res.send({
            status: 200,
            data:result
        })
    })
}

const sql2 = 'insert into ev_article_cate(name,alias) values(?,?)'
const sql3 = 'select * from ev_article_cate where name = ? or alias=?'
exports.addarcate = (req, res) => {
    db.query(sql3, [req.body.name, req.body.alias], (err, result) => {
        if (err) return err.message
        if (result.length !== 0) {
            return result[0].alias === req.body.alias ? res.cc('alias重复'):res.cc('name重复')
        }
        db.query(sql2, [req.body.name, req.body.alias], (err, result) => {
            if (err) return err.message
            res.send({
                status: 200,
                message:'插入成功',
                data:result
            })
        })

    })
    
}


const sql4 = 'update ev_article_cate set is_delete=1 where id=?'
exports.deleteCateById = (req, res) => {
    db.query(sql4, req.params.id, (err, result) => {
        if (err) return err.message
        console.log(req);
        res.send({
            status: 200,
            message: '删除成功',
            data:result
        })
    })
    
}
const sql5 = 'select * from ev_article_cate where id=?'
exports.cates = (req, res) => {
    db.query(sql5, req.params.id, (err, result) => {
        if (err) return err.message
        if (result[0].is_delete === 0) {
            res.send({
                status: 200,
                message: '文章获取成功',
                date:result[0]
            })
        } else {
            res.send('文章已被删除')
        }
    })
   
}
const sqlUpdate = 'update ev_article_cate set name=?,alias=? where id=?'
exports.sqlupdate = (req, res) => {
    let fla = ''
        db.query(sql3, [req.body.name, req.body.alias], (err, selectResult) => {
           /*  console.log(selectResult[0]);
            if (err) return res.send(err.message)
            if (selectResult[0].name === req.body.name&&selectResult[0].alias===req.body.alias) {
                return res.send({
                    status: 1,
                    message: '数据重复',
                })
            }
            
             */
            fla = selectResult[0]
    
        })
       
  
   
    db.query(sqlUpdate, [req.body.name, req.body.alias, req.body.id], (err, result) => {
            
            /* console.log(result); */
            if (err) return res.send(err)
            /* res.send('good') */
            res.send({
                status: 200,
                message: '更新成功',
                data:fla
                
            })
        })
       
    }
    
    
   
    
    
    

