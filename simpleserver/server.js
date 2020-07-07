const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('simpleserver'))

app.listen(3000);
console.log('server running on port : ', PORT )
