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

let context = {
  title: 'blog',
  str: 'test', // https://ssr.vuejs.org/zh/api/#renderer-%E9%80%89%E9%A1%B9
  styles: '<style>body { color: red }</style>',
  state: {
    name: 'springleo'
  },
  url: '/home', // 路由要正确
}
const render = function (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
      }
      resolve(html)
    })
  })
}

render(context).then(html => {
  const initdata = `[{
    id: 2,
    name: 'ks-clipboard',
    data: {
      content: 'hale'
    }
  }]`
  const initdataScript = `<script type="text/javascript">
  window.INIT_DATA = ${initdata.replace(/\n+$/, '')};
  </script>`

  const scriptsString = context.renderScripts(); // https://ssr.vuejs.org/zh/guide/build-config.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE-client-config
  html = html.replace(scriptsString, `\n${initdataScript}\n${scriptsString}`);
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html, 'utf-8');
  console.log('server side render success.');
})

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exit(1) // To exit with a 'failure' code
});
