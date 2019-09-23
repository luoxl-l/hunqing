var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res, next) {
  let data = req.body;
  for (let item in data) {
    var datas1 = JSON.parse(item);
  }
  let sql = `select * from users where username='${datas1.username}' and password='${datas1.password}'`;
  let obj={};
  openDatabase(sql,function (err, data){
    if (!err) {

      if (data.length == 0) {
        obj.code = 401;
        obj.msg = "用户名或密码错误";
      } else {
        obj.code = 201;
        obj.msg = "登录成功";
      }

    } else {
      obj.code = 402;
      obj.msg = "登录失败";
    }
    res.send(JSON.stringify(obj));
  })
  

});

router.post('/register', function (req, res, next) {
  let data = req.body;
  for (let item in data) {
    var datas = JSON.parse(item);
  }
  console.log(datas);
  let sql1 = `select * from users where username='${datas.username}' or tel='${datas.tel}'`;
  let sql = `insert into users (username,password,tel) values ('${datas.username}','${datas.password}','${datas.tel}')`;
  let obj={};
  let p = new Promise((resolve, reject) => {
    openDatabase(sql1, function (err, data) {
      if (!err) {
        if (data.length != 0) {
          obj.code = 403;
          obj.msg = "用户已存在";
          res.send(JSON.stringify(obj));
        } else {
          resolve();
          // obj.msg = "可以注册";
        }

      }
    })
  })
    p.then(function () {
      
        openDatabase(sql, function (err, data) {
          if (!err) {
            obj.code = 201;
            obj.msg = "注册成功";
            res.send(JSON.stringify(obj));
          } else {
            obj.code = 401;
            obj.msg = "注册失败";
            res.send(JSON.stringify(obj));
          }
          
        })
      
    })

  

});

router.post('/select', function (req, res, next) {
  let data = req.body;
  for (let item in data) {
    var datas2 = JSON.parse(item);
  }
  console.log(datas2);
  let sql = `select * from users where username='${datas2.username}' and tel='${datas2.tel}' `;
  let obj={};
  openDatabase(sql,function (err, data){
    if (!err) {

      if (data.length == 0) {
        obj.code = 401;
        obj.msg = "用户名或手机号错误";
      } else {
        obj.code = 201;
        obj.msg = "验证成功";
        obj.username=datas2.username;
      }

    } else {
      obj.code = 402;
      obj.msg = "验证失败";
    }
    res.send(JSON.stringify(obj));
  })
  

});

router.post('/set', function(req, res, next) {
  let data = req.body;
  for (let item in data) {
    var datas3 = JSON.parse(item);
  }
  console.log(datas3)
  let sql = `update users set password='${datas3.password}' where username='${datas3.username}' `;
  let obj={};
  openDatabase(sql,function (err, data){
    if (!err) {

      obj.code=201;
      obj.msg="重置成功"

    } else {
      obj.code = 402;
      obj.msg = "重置失败";
    }
    res.send(JSON.stringify(obj));
  })
  
});

router.get('/btype', function(req, res, next) {
  let sql = `select * from book_type`;
  let obj={};
  openDatabase(sql,function (err, data){
    if (!err) {
      obj.code=201;
      obj.msg="读取成功";
      obj.data=data;
      res.send(JSON.stringify(obj));
    } else {
      obj.code = 402;
      obj.msg = "读取失败";
      res.send(JSON.stringify(obj));
    }
   
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
