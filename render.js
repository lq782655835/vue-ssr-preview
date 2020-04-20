/*
 * 手动触发服务端渲染的 node 脚本
 * @Author: springleo
 */

const fs = require('fs');
const path = require('path');

const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.join(__dirname, './src/index.template.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  template,
  runInNewContext: false
});

const render = function (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      console.log(err, html, 9999)
      if (err) {
        reject(err)
      }
      resolve(html)
    })
  })
}

render({
  title: 'blog',
  url: '/home' // 路由要正确
})

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exit(1) // To exit with a 'failure' code
});
