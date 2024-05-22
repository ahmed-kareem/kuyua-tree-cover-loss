const express = require('express');
const cors = require('cors');
const AuthenticationMW = require('./middlewares/AuthMiddleware');
const ErrorHandlingMW = require('./middlewares/ErrorHandlingMiddleware');

const app = express()
app.use(cors());
const port = 3000

app.use(AuthenticationMW);

app.get('/', (req, res) => {
  res.send('Hello kuyua!')
})

require("./startup/routes")(app)
app.use(ErrorHandlingMW);

app.listen(port, () => {
  console.log(`hello from kuyia, listening on port ${port}`)
})