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
  app.use(express.json());
  app.post('/api/reviews', (req, res) => {
    const review = req.body; // Assuming the review data is sent in the request body
  
    // Perform server-side validation on the review data
    if (!review.title || !review.content) {
      res.status(400).json({ error: 'Title and content are required fields.' });
      return;
    }
  
    // Store the review in the database or perform any other required operations
  
    res.status(201).json({ message: 'Review submitted successfully!' });
  });