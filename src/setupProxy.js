const { createProxyMiddleware } = require('http-proxy-middleware');
const mock = require('./mock');

module.exports = function(app) {
  // app.use(
  //   '/api', createProxyMiddleware({
  //     target: 'http://127.0.0.1:7841',
  //     changeOrigin: true,
  //   }));
  app.use('/api', (ctx, req, res) => {
    req.end(JSON.stringify(ctx.originalUrl in mock ? mock[ctx.originalUrl] : {}));
    return mock[ctx.originalUrl];
  });
};