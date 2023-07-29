// 登录成功需返回用户信息
module.exports = ctx => {
  const username = ctx.request.body.username,
    password = ctx.request.body.password

  if (username === 'admin' && password === 'test@123')
    ctx.body = { code: 1, msg: '登录成功', data: { id: 1, username, organization: '湖南高速公路管理局' } }
  else
    ctx.body = { code: 0, msg: '用户名或密码错误' }

}
