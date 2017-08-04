const request = require('../util/request.js');
const config = require('../config.js');

module.exports = function (app) {
  app.get('/get_realtime_news', (req, res) => {
    const data = {
      yesterday: 1,
    }

    request.post({
      url: config.urls.get_realtime_news,
      headers: config.headers(),
      form: Object.assign(data, req.query),
    }).then(data => {
      try {
        request.success(res, JSON.parse(data));
      } catch (e) {
        request.success(res, data);
      }
    }, function (e) {
      request.error(res, e.message);
    });
  });
}
