var zmq = require('zmq'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var LPServer = function (options, workerFn) {
  this.workerFn = workerFn;
  this.sock = zmq.socket('rep');
  this.sock.bind(options.url, function (err) {
    if (err) {
      throw err;
    }

    var cycles = 0;
    this.sock.on('message', function (msg) {
      this.workerFn(function (data) {
        this.sock.send(data);
      }.bind(this));

      // the following code pretends to fail in various ways,
      // in order to test whether or not  the client can handle it
      //++cycles;
      //if (cycles > 3 && Math.floor(Math.random() * 3) === 0) {
      //  // ignore
      //  console.log('dropping');
      //  this.sock.close();
      //}
      //else if (cycles > 3 && Math.floor(Math.random() * 3) === 0) {
      //  // pretend we're busy
      //  console.log('delaying');
      //  setTimeout(function () {
      //    this.sock.send('some work');
      //  }.bind(this), 2000);
      //}
      //else {
      //  this.sock.send('some work');
      //}
    }.bind(this));

    this.sock.on('error', function (err) {
      this.emit('error', err);
    }.bind(this));
  }.bind(this));
};

util.inherits(LPServer, EventEmitter);

module.exports = LPServer;
