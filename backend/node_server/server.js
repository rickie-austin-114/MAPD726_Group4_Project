const express = require('express');
const cors = require("cors")

const app = express();
const PORT = 3001;

app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});