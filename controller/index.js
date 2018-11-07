// 展示首页页面
const showIndexPage = (req, res) => {
  // 使用 render 函数之前，一定要保证安装和配置了 ejs 模板引擎
  res.render('index.ejs', { name: 'zs', age: 22 })
}

module.exports = {
  showIndexPage
}
