const axios = require('axios');

const testConcurrency = (path) => {
  for (let i = 0; i < 10; i++) {
    axios.get(`http://localhost:8000/${path}`).then((data) => {
      let d = new Date();
      console.log(`path: ${path} | statis: ${data.status} | time: ${d.toLocaleTimeString()}`);
    });
  }
}

const paths = [
  "default-request",
  "http-process-request",
  "worker-request",
]

for (p of paths) {
  testConcurrency(p);
}