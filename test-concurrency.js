const axios = require('axios');

for (let i = 0; i < 10; i++) {
  axios.get("http://localhost:8000/http-broker-request/").then(data => {
    console.log(`broker request went down, the code is: ${data.status}`);
  })
}
for (let i = 0; i < 10; i++) {
  axios.get("http://localhost:8000/worker-request/").then(data => {
    console.log(`worker request went down, the code is: ${data.status}`);
  })
}