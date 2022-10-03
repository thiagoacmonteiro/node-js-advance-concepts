const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  // Its recommended to match the number of clusters to the number os cores
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // Im a child. im going to act like server and do nothing else
  const express = require('express');
  const app = express();

  function doWork(duration) {
    const start= Date.now();

    while(Date.now() - start < duration) {

    }
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi there')
  })

  app.get('/fast', (req, res) => {
    res.send('This was fast');
  })

  app.listen(3000, () => console.log('Listening on PORT 3000'))
}

// RUN 'pm2 start index.js -i 0' to open cluster forks according to your system capacity 