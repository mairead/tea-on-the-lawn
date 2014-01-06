var MONGOHQ_URL="mongodb://alice:whiterabbit@dharma.mongohq.com:10031/tea-on-the-lawn"

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'website'
    },
    port: 3000,
    db: 'mongodb://localhost/website-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'website'
    },
    port: 3000,
    db: 'mongodb://localhost/website-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'website'
    },
    port: 3000,
    db: 'MONGOHQ_URL'
  }
};

module.exports = config[env];
