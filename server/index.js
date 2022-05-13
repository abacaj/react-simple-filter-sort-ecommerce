const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/items', (req, res) => {
  const query = req.query;

  console.log(query);

  setTimeout(() => {
    res.json(data);
  }, 150);
});

app.listen(3001, () => {
  console.info('server listening on: 3001');
});
