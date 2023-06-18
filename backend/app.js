const express = require('express');

const app = express();
const port = 3000;

app.use('/assets', express.static(__dirname + '/dist/assets'));

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
