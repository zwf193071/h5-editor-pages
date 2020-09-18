# h5-editor-pages

- [在线预览地址](https://zwf193071.github.io/h5-editor-pages/)

## Project setup
```
npm install

```
启动客户端`npm run dev-client`
启动服务端`npm run dev-server`

我试过`npm run dev`但无法同时启动客户端和服务端，原因待查

### 踩过的坑
1. 创建新的数据库`h5page`，但无法连接上

解决方式：在mongodb的连接地址添加`?authSource=admin`即可成功连接

2. 前端接口明明已传入参数，但后台接口却显示data为空，如下代码所示
```
let _id = mongoose.mongo.ObjectId(ctx.params._id)
let data = ctx.request.body
console.log(data); //data为null，但参数已经传递
```
解决方式：在app.js里引入`const bodyParser = require('koa-bodyparser');`，在`app.use(router.routes()); `前加上`app.use(bodyParser());`，即可成功获取到前端接口传递来的参数

#### 知识点
1. Robo 3T界面化查看mongodb

### Thanks to
* [quark-h5](https://github.com/huangwei9527/quark-h5)
