const express = require('express');
const app = express();
const port = 3000;

// Define routes and middleware here

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.use(express.static('public'));