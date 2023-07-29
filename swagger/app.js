const Koa = require('koa')
const app = new Koa()
const path = require('path')
const debug = require('debug')('koa-weapp')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const compress = require('koa-compress')
const cors = require('koa2-cors')
// const address = require('address');

// 解析请求体
app.use(bodyParser())

// 跨域设置
app.use(convert(cors({
	allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Accept'],
    origin: function(ctx) {
        return '*' // 本地环境
    }
})))

// 中间件 设置gzip
app.use(compress({
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
}))

// 静态文件服务
app.use(convert(staticCache(path.join(__dirname, './dist'), {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: false
})))

const port = 8882
// let ip = ''

// let lanUrlForConfig = address.ip()
// if (lanUrlForConfig) {
//     if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
//         ip = lanUrlForConfig
//     }
// }

// 启动程序，监听端口
app.listen(port, () => {
	debug(`listening on port ${port} for swagger`)
    // debug(`open http://${ip || 'localhost'}:${port}/dist/ui/index.html to view swagger-ui`)
    // debug(`open http://${ip || 'localhost'}:${port}/dist/editor/index.html to view swagger-editor`)
})