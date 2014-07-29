var LPServer = require('../index');

function workerFn(cb) {
  console.log(Date.now() + ' - Got a request for work');
  return cb(JSON.stringify({lpserver: 'pretending to do work'}));
}

var lps = new LPServer({url: 'tcp://127.0.0.1:9000'}, workerFn);

lps.on('error', function (error) {
  console.log('error', error);
  process.exit(1);
});
