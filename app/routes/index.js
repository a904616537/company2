const async           = require('async');
const moment          = require('moment');
const company_service = require('../service/company.service');
const setting_service = require('../service/setting.service');
const banner_service  = require('../service/banner.service');
const news_service    = require('../service/news.service');
const bullet_service  = require('../service/bullet.service');

function getnav(lang, cb) {
  company_service.getCompany((err, companys) => {
    var about = [], server = [], contact = [];
    async.each(companys, (company, cb) => {
      company.lang = company.article.find(article => {
        return article.language == lang
      });
      switch(company.pid) {
        case 0:
          about.push(company);
          cb();
        break;
        case 1:
          server.push(company);
          cb();
        break;
        case 2:
          contact.push(company);
          cb();
        break;
        default:
          about.push(company);
          cb();
        break;
      }
    }, err => {
      cb({about, server, contact});
    })
  })
}



module.exports = function (app) {
  app.get('/', function (req, res) {
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      banner_service.Get(banner => {
        news_service.getNewsIndex(lang, news => {
          getnav(lang, date => {
            nav = date
            res.render('index', {nav: nav, settings, banner, news});
          })
        })
      })    
    })
  });
  app.get('/about/:_id', function (req, res) {
    var _id = req.params._id;
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      getnav(lang, date => {
        nav = date
        company_service.SelectById(_id)
        .then(company => {
          company.lang = company.article.find(article => {
            return article.language == lang
          });
          res.render('about', {company, nav: nav, settings});
        })
        .catch(err => {
          res.render('about', {company:{lang:{}}, nav: nav, settings});
        })
      })      
    })
  });
  app.get('/article/:_id', function (req, res) {
    const _id = req.params._id;
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      news_service.SelectById(_id, lang, news => {
        getnav(lang, date => {
              nav = date
              res.render('culture', {nav: nav, settings, news});
            })
        })  
      })
  });

  app.get('/contact/:_id', function (req, res) {
    var _id = req.params._id;
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      getnav(lang, date => {
        nav = date
        company_service.SelectById(_id)
        .then(company => {
          company.lang = company.article.find(article => {
            return article.language == lang
          });
          res.render('contact', {company, nav: nav, settings});
        })
        .catch(err => {
          res.render('contact', {company:{lang:{}}, nav: nav, settings});
        })
      })      
    })
  });

  app.get('/bullet', function (req, res) {
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      getnav(lang, date => {
        nav = date
        bullet_service.getBullet((bullets) => {
          bullets = bullets.map(bullet => {
            bullet.time = moment(bullet.createTime).format('YYYY年MM月DD日 HH:mm:ss');
            bullet.lang = bullet.article.find(article => {
              return article.language == lang
            });
            return bullet;
          })
          console.log('bullets', bullets)
          res.render('bullet', {bullets, nav: nav, settings});
        })
      })      
    })
  });

  app.get('/list', function (req, res) {
    var nav = [];
    var lang = req.cookies.lang
    if(lang == 'zh-CN') lang = 'zh';
    else if(!lang) lang = 'zh'
    setting_service.getSettingBylang(lang, (err, settings) => {
      news_service.getNews(lang, news => {
        getnav(lang, date => {
              nav = date
              res.render('list', {nav: nav, settings, news});
            })
        })  
      })
  })
}
