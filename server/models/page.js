const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Schema
const schema = new Schema({
	_id: { type: ObjectId }, // 默认生成，不加也可以
	title:  { type: String, default: '未命名场景' },
	coverImage: { type: String, default: '' },
	description: { type: String, default: '我用H5页面编辑器做了一个超酷炫的H5，快来看看吧。' },
	pages: Schema.Types.Mixed, //用于原始数据存储
	script:  { type: String, default: '' }, // 第三方脚本插件
	author: { type: String, default: '' },
	name: { type: String, default: '' },
	width: {type: Number, default: 375 }, // 页面宽
	height: {type: Number, default: 611 }, // 页面高度
})

// Model
const model = mongoose.model('page', schema, 'page');

module.exports = model;
