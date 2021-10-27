// 1. Using Set Timeout
console.log("Start");
setTimeout(() => {
  console.log("Set timeout called");
}, 5000);
console.log("End");

// 2. Using promise
console.log("Start");
const delay = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved after 5 seconds");
  }, 5000);
});

delay
  .then((resolvedValue) => {
    console.log(resolvedValue);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("End");
