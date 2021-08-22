const express = require('express');
const userRoutes = require('./app/routes/user');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

userRoutes(app);

app.listen(PORT);
