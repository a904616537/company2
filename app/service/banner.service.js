const config = require('../../config/config'),
mongoose     = require('mongoose'),
banner_mongo = mongoose.model('banner');

module.exports = {
	// 获取所有公司信息
	Get(callback) {
		banner_mongo.find({type: 'skyfortune'})
		.sort({order: 1, createTime: -1})
		.exec((err, banner) => {
			callback(banner)
		})
	}
}
