const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

//changing the thread pool number of threads
process.env.UV_THREADPOOL_SIZE = 4; //UV stands for libuv of Node.js

setTimeout(() => console.log("Timer 1 finished"), 0); //Not running in event loop
setImmediate(() => console.log("Timer Immediate 1 finished")); //Not running in event loop

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("---");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  //I set a higher timeout 'cuz my cpu is slower and threads takes longer than in the video exmaple
  setTimeout(() => console.log("Timer 3 finished"), 6000);
  setImmediate(() => console.log("Timer Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick finished"));

  //Thread pool

  //this becomes top-level code for being sync. --blocking code--
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted 1");

  //async
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 2");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 3");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 4");
  });
});

console.log("Hello top-level code!");
