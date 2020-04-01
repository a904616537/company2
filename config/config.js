var path     = require ('path'),
	rootPath = path.normalize(__dirname + '/..')

var config = {
	root         : rootPath,
	languagePath : rootPath + '/app/language/',
	mongo        : 'mongodb://kain:000000@127.0.0.1/company',
	cookie       : {
        secret     : 'company',
        sessionName: 'session'
    }
}

module.exports = config
