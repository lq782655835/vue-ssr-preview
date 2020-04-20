/* eslint-disable import/no-unresolved */
const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const logger = require('koa-logger')
const bluebird = require('bluebird')
const chalk = require('chalk')

global.Promise = bluebird

const isProd = process.env.NODE_ENV === 'production'

const rootPath = path.resolve(__dirname, '../')

const resolve = file => path.resolve(rootPath, file)

// create koa instance
const app = new Koa()

// cache static
const serve = (filepath, cache) => require('koa-static')(resolve(filepath), {
  // maxage: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(logger())
app.use(favicon('./public/favicon.ico'))
app.use(serve('dist', true))

const router = require('koa-router')()
router.get('/home', async (ctx, next) => {
  let html = require('fs').readFileSync(resolve('dist/index.html'), 'utf-8');
  console.log(html)
  ctx.response.body = html
  // await require('koa-send')(ctx, '../dist/index.html')
})
app.use(router.routes()).use(router.allowedMethods())


// page not found
app.use((ctx, next) => {
  ctx.type = 'html'
  ctx.body = '404 | Page Not Found'
})

const port = process.env.PORT || 8080
app.listen(port, '127.0.0.1', () => {
  console.log('\n--------- Started ---------')
  console.log(chalk.bold('NODE_ENV:'), chalk.keyword('orange').bold(process.env.NODE_ENV || 'development'))
  const url = `http://127.0.0.1:${port}`
  console.log(chalk.bold('SERVER:'), chalk.blue.bold(url))
  console.log('---------------------------\n')
})
