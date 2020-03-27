// const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

module.exports = function(app) {
  // app.use(
  //   '/api', createProxyMiddleware({
  //     target: 'http://127.0.0.1:7841',
  //     changeOrigin: true,
  //   }));
  app.use('/api', (ctx, res) => {
    fs.readFile(path.join(__dirname, 'mock.json'), {}, (err, data) => {
      try {
        const mock = JSON.parse(data.toString());
        res.end(JSON.stringify(ctx.originalUrl in mock ? mock[ctx.originalUrl] : {}));
      } catch (e) {
        console.error(e);
        res.end("{}");
      }
    });
  });
};