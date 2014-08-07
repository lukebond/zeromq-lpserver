# zeromq-lpserver

ZeroMQ Reliable Request-Reply Lazy Pirate Pattern - server module

Don't know what this is? See the [0MQ Guide](http://zguide.zeromq.org/page:all#toc89).

## Usage

Use in conjunction with [Lazy Pirate Client](https://github.com/lukebond/zeromq-lpclient).

Make sure you have 0MQ installed on your machine first (ie. the C libraries). For OS X you can do this:

```
$ brew install --universal zeromq
```

On Ubuntu:
```
$ sudo apt-get -y install libzmq3-dev
```

Then you should be able to install NPM modules that depend upon the 0MQ libs (like this one).

### Lazy Pirate example

`lpclient.js` (taken from https://github.com/lukebond/zeromq-lpclient/blob/master/example/example.js):
```javascript
var LPClient = require('../index');

var lpc = new LPClient({url: 'tcp://127.0.0.1:9000', timeout: 2500});

lpc.on('message', function (message) {
  console.log(Date.now() + ' - Got work:', message.toString('utf8'));
  setTimeout(function () {
    lpc.ready();
  }, 100);
});
lpc.ready();
```

`lpserver.js` (taken from https://github.com/lukebond/zeromq-lpserver/blob/master/example/example.js):
```javascript
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
```

Run both of these together in two different terminals and you should get output like this:
```
$ node lpclient
1406654717202 - Got work: {"lpserver":"pretending to do work"}
1406654717305 - Got work: {"lpserver":"pretending to do work"}
1406654717405 - Got work: {"lpserver":"pretending to do work"}
1406654717507 - Got work: {"lpserver":"pretending to do work"}
1406654717608 - Got work: {"lpserver":"pretending to do work"}
1406654717709 - Got work: {"lpserver":"pretending to do work"}
1406654717810 - Got work: {"lpserver":"pretending to do work"}
1406654717912 - Got work: {"lpserver":"pretending to do work"}
1406654718014 - Got work: {"lpserver":"pretending to do work"}
```

```
$ node lpserver
1406654716237 - Got a request for work
1406654717191 - Got a request for work
1406654717305 - Got a request for work
1406654717405 - Got a request for work
1406654717507 - Got a request for work
1406654717607 - Got a request for work
1406654717708 - Got a request for work
1406654717810 - Got a request for work
1406654717912 - Got a request for work
1406654718013 - Got a request for work
```

## Licence

MIT
