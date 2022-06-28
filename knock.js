let players = {};
let queue = [];

function send(name, msg) {
  console.log(msg);
  queue.push([name, msg]);
}

function run() {
  while (queue.length) {
    let [name, msg] = queue.shift();
    players[name].next(msg);
  }
}

function* knocker() {
  send("asker", "knock knock");

  let question = yield;
  if (question !== "who's there?")
    return;

  send("asker", "gene");

  question = yield;
  if (question !== "gene who?")
    return;

  send("asker", "generator!");
}

function* asker() {
  let knock = yield;
  if (knock !== "knock knock")
    return;

  send("knocker", "who's there?");

  let answer = yield;
  send("knocker", `${answer} who?`);
}

players.knocker = knocker();
players.asker = asker();

send("asker", "asker get ready..."); // call first .next()
send("knocker", "knocker go!"); // start the conversation

run();
