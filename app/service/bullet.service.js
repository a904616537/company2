'use strict';
const mongoose = require('mongoose'),
bullet_mongo   = mongoose.model('bullet');

module.exports = {
	// 获取所有新闻
	getBullet(callback) {
		bullet_mongo.find({})
		.sort({top: -1, createTime: -1})
		.exec((err, bullet) => {
			callback(bullet)
		})
	},
	getBulletById(_id, callback) {
		bullet_mongo.findById(_id, callback)
	}
}
