const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const mysql = require('mysql')


const conn = mysql.createConnection({
    host:'127.0.0.1',
    database: 'yzk_blog',
    user: 'root',
    password: 'root',

})

app.set("view engine", "ejs");

app.set("views", "./views");

// 注册解析表单数据的中间件

app.use(bodyParser.urlencoded({ extended: false }));

// 把 node_modules 文件夹 托管为静态资源目录

app.use("/node_modules", express.static("./node_modules"));

// 用户请求项目首页

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "zs", age: 22 });
});

// 用户请求注册页面

app.get("/register", (req, res) => {
  res.render("./user/register.ejs", {});
});
// 用户请求登录页面
app.get("/login", (req, res) => {
  res.render("./user/login.ejs", {});
});

//  要注册新用户了
app.post("/register", (req, res) => {
  // 完成用户注册的业务逻辑

  const body = req.body;

  // 判断用户输入的数据是否完整

  if(body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <=0) {
      return res.send({msg:'请填写完整的表单数据在注册用户!',status:401})
  }
  //查询用户名是否重复

  const sql1 = 'select count(*) as count from blong_users where username'

  conn.query(sql1,body.username,(err,result)=>{
    //如果查询失败,则告知客户端失败
    if(err) return res.send({msg:'用户名查重失败!',status: 402})
    console.log(result)
  })

  res.send({ msg: "注册新用户成功!", status: 200 });
});

app.listen(80, () => {
  console.log("server running at http://127.0.0.1");
});
