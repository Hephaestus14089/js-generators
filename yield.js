function* listener() {
    console.log("listening...");
    while (true) {
        let msg = yield;
        console.log("heard:", msg);
    }
}

const l = listener();
l.next("are you there?");
l.next("how about now?");
l.next("blah blah blah")