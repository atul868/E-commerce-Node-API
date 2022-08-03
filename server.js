
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./mongodb_connection');
const { router } = require("./routes/route");
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded());
app.use(router);
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

  
