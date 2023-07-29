const controllers = require('../controllers')
const router = require('koa-router')({
    prefix: '/test'
})

router.post('/login', controllers.login)

router.post('/portal', controllers.portal)

router.post('/home', controllers.home)

module.exports = router