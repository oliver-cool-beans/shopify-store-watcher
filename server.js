require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

if(process.env.NODE_ENV !== 'production'){
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
