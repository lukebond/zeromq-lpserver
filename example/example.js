var LPServer = require('../index');
var lps = new LPServer({url: 'tcp://127.0.0.1:9000'});

lps.on('error', function (error) {
  console.log('error', error);
  process.exit(1);
});
