const config  = require('../../config/config'),
mongoose      = require('mongoose'),
moment = require('moment'),
company_mongo = mongoose.model('company');

module.exports = {
	// 获取所有公司信息
	getCompany(callback) {
		company_mongo.getAll('skyfortune', callback)
	},
	getCompanyForNav(type, callback) {
		company_mongo.find({pid: {$in : null}, type})
		.exec((err, company) => {
			console.log(company)
			callback(company)
		})
	},
	SelectById(_id) {
		return new Promise((resolve, reject) => {
			company_mongo.findOne({_id})
			.exec((err,docs) => {
				if (err) return reject(err);
				docs.time = moment(docs.createTime).format('YYYY年MM月DD日 HH:mm:ss');
				console.log(docs)
				resolve(docs);
			})
        })
	}
}
