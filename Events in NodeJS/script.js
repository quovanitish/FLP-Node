const eventConfig = require("./config");
const eventEmitter = require("events");

let emitter = new eventEmitter();

emitter.on(eventConfig.events.GREET, () => {
  console.log("Hello stranger");
});

emitter.on(eventConfig.events.GREET, () => {
  console.log("Hi once again");
});

emitter.on(eventConfig.events.BYE, () => {
  console.log("Bye stranger");
});

emitter.emit(eventConfig.events.GREET);
emitter.emit(eventConfig.events.BYE);
