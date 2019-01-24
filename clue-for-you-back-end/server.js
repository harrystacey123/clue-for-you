const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`We are live on ${port}`)
});