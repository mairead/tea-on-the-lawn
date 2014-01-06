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
    db: 'mongodb://localhost/website-production'
  }
};

module.exports = config[env];
