exports = module.exports = {
  port: 3000,
  session: {
    secret: 'node-practice',
    key: 'node-practice',
    maxAge: 2592000000,
  },
  mongodb: 'mongodb://localhost:27017/node-practice',
};
