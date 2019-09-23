var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
     let index=req.query.id;
    let sql = `select * from book_list where id=${index}`;
    let obj={};
    openDatabase(sql,function (err, data){
      if (!err) {
        obj.code=201;
        obj.msg="读取成功";
        obj.data=data;
        // console.log(data);
        // res.send(JSON.stringify(obj));
      } else {
        obj.code = 402;
        obj.msg = "读取失败";
        
      }
     res.send(JSON.stringify(obj));
    })
  
  });
router.get('/user', function(req, res, next) {
    // res.render('index', { title: 'Express' });
     let index=req.query.id;
    let sql = `select * from book_list where id=${index}`;
    let obj={};
    openDatabase(sql,function (err, data){
      if (!err) {
        obj.code=201;
        obj.msg="读取成功";
        obj.data=data;
        // console.log(data);
        // res.send(JSON.stringify(obj));
      } else {
        obj.code = 402;
        obj.msg = "读取失败";
        
      }
     res.send(JSON.stringify(obj));
    })
  
  });
  
  router.get('/rm', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let sql = `select * from book_list where bid<11`;
    let obj={};
    openDatabase(sql,function (err, data){
      if (!err) {
        obj.code=201;
        obj.msg="读取成功";
        obj.data=data;
        // console.log(data);
        // res.send(JSON.stringify(obj));
      } else {
        obj.code = 402;
        obj.msg = "读取失败";
        
      }
     res.send(JSON.stringify(obj));
    })
  
  });  
  function openDatabase(sql, fn) {
    var conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'bookstore'
    });
    conn.connect();
    conn.query(sql, function (err, data) {
      fn(err, data);
    });
    conn.end();
  }

  module.exports = router;