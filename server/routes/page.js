// 引入上一步创建的model
const mongoose = require('mongoose');
const Page = require('../models/page');
const router = require('koa-router')()

/**
 * 修改页面
 */
router.post('/update/:_id', async ctx=> {
	let _id = mongoose.mongo.ObjectId(ctx.params._id)
	let data = ctx.request.body
	ctx.body = await Page.updateOne({_id}, { $set: data }, {
		runValidators: true
	})
})



module.exports = router
