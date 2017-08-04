const urls = {
  get_realtime_news: 'http://www.yuncaijing.com/news/get_realtime_news/yapi/ajax.html',
  ws9503: 'ws://push.yuncaijing.com:9503/',
  ws9507: 'ws://push.yuncaijing.com:9507/',
}

function headers() {
  return {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36 QQBrowser/4.2.4763.400',
  };
}

module.exports = {
  urls,
  charset: 'utf-8',
  headers,
};
