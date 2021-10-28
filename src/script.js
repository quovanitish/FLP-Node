// 1. Using Set Timeout
console.log("Start");
setTimeout(() => {
  console.log("Set timeout called");
}, 2000);
console.log("End");

// 2. Using promise
console.log("Start");
const delay = new Promise((resolve, reject) => {
  let startTime = new Date().getTime();
  let endTime = startTime;

  while (endTime < startTime + 5000) {
    endTime = new Date().getTime();
  }
  resolve("While loop expired after 5 seconds");
});

delay
  .then((resolvedValue) => {
    console.log(resolvedValue);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("End");

/*Using setInterval() */
console.log("Start");
const rollDice = () => {
  return Math.round(6 * Math.random());
};

const intervalId = setInterval(() => {
  let diceNumber = rollDice();

  if (diceNumber === 1) {
    console.log(`You got ${diceNumber}, so you can start the game`);
  } else if (diceNumber === 6) {
    console.log(`You got ${diceNumber}, so you can start the game`);
  } else {
    console.log(`Oops, you got ${diceNumber} please roll the dice again`);
  }
}, 2000);

// clear dice rolling interval after 10 seconds
setTimeout(() => {
  clearInterval(intervalId);
}, 9000);
console.log("End");
