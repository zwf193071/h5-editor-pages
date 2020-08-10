# h5-editor-pages

## Project setup
```
npm install

```
启动客户端`npm run dev-client`
启动服务端`npm run dev-server`

我试过`npm run dev`但无法同时启动客户端和服务端，原因待查

### 踩过的坑
1. 创建新的数据库`h5page`，但无法连接上

***解决方式：*** 在mongodb的连接地址添加`?authSource=admin`即可成功连接

2. 服务端插入页面数据，用原作者的这块代码`Page.updateOne({_id}, { $set: data },{ runValidators: true })`，始终无法显示插入的数据，通过Robo 3T查看h5page里的Collections是否有`page`，却发现并没有该项

***临时解决方式：*** 采用`Page.create({ _id, ...data })`，数据可插入成功

3. 前端接口明明已传入参数，但后台接口却显示data为空，如下代码所示
```
let _id = mongoose.mongo.ObjectId(ctx.params._id)
let data = ctx.request.body
console.log(data); //data为null，但参数已经传递
```
***解决方式：*** 在app.js里引入`const bodyParser = require('koa-bodyparser');`，在`app.use(router.routes()); `前加上`app.use(bodyParser());`，即可成功获取到前端接口传递来的参数


### Thanks to
* [quark-h5](https://github.com/huangwei9527/quark-h5)
