const express = require("express");
const app = express();
const util = require('util');
const exec = util.promisify(require("child_process").exec);

const workerpool = require('workerpool');
const pool = workerpool.pool();

const axios = require('axios');

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.get("/default-request/", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 999999999; i++) {
    sum += i;
  }
  return res.send("request completed! result: " + sum);
})

app.get("/worker-request/", (req, res) => {
  pool.exec(() => {
    let sum = 0;
    for (let i = 0; i < 999999999; i++) {
      sum += i;
    }
    return sum;
  }).then((data) => {
    return res.send("worker request completed! result: " + data);
  }).then(() => {
    pool.terminate(); // terminate all workers when done
  });
})

app.get("/child-process-request/", async (req, res) => {
  const { stdout, stderr } = await exec("./another-process");
  if (stderr) {
    throw new Error(stderr);
  }
  return res.send("another process request completed! result: " + stdout);
})

app.get("/http-process-request/", async (req, res) => {
  const rq = await axios.get("http://localhost:7000/");
  return res.send("another process request completed! result: " + rq.data);
})

app.listen(8000, () => {
  console.log("server running on port 8000!");
})

//default request took 1062.30 ms
//499999998067109000
//worker process took 1088.67 ms concurrent tho
//499999998067109000
//child process request took 2519.53 ms also concurrent
//499999998500000001
//http broker request took 307.81 ms
//499999998500000001