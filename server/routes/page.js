// 引入上一步创建的model
const mongoose = require('mongoose');
const Page = require('../models/page');
const router = require('koa-router')()

router.post('/add', async ctx => {
	let data = ctx.request.body
	ctx.body = await Page.create({
		...data,
		_id: mongoose.mongo.ObjectId()
	})
})
router.get('/view/:_id', async ctx => {
	let _id = mongoose.mongo.ObjectId(ctx.params._id)
	let page = await Page.findOne({ _id })
	ctx.status = 201;
	// todo 根据不同type渲染不同得模板引擎
	await ctx.render('h5-swiper', { pageData: page })
})
/**
 * 修改页面
 */
router.post('/update/:_id', async ctx=> {
	let _id = mongoose.mongo.ObjectId(ctx.params._id)
	let data = ctx.request.body
	ctx.body = await Page.updateOne({ _id }, { $set: data }, {
		runValidators: true
	})
})

router.delete('/delete/:_id', async ctx => {
	let _id = mongoose.mongo.ObjectId(ctx.params._id)
	ctx.body = await Page.deleteOne({ _id })
})

module.exports = router
