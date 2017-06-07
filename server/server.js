const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


// we configure express by calling methods on app
// create routes
// add middleware
// startup server
const app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
