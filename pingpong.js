/*

// Maximum call stack size exceeded error
// Mutua recursion blows the stack limit!

function ping(n) {
  console.log("ping", n);
  return pong(n + 1);
}

function pong(n) {
  console.log("pong", n);
  return ping(n + 1);
}

ping(0);

*/

/*
 * Generator co-op exceeds limit.
 * Warning: Try at your own risk!
 */

let players = {};
let queue = [];

function send(name, n) {
  queue.push([name, n]);
}

function run() {
  while (queue.length) {
    const [name, n] = queue.shift();
    players[name].next(n);
  }
}

function* ping() {
  let n;

  while (true) {
    n = yield;
    console.log("ping", n);
    send("pong", ++n);
  }
}

function* pong() {
  let n;

  while (true) {
    n = yield;
    console.log("pong", n);
    send("ping", ++n);
  }
}

players.ping = ping();
send("ping", "get ready");

players.pong = pong();
send("pong", "get ready");

send("ping", 0);
run();
