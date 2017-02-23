const path = require('path');
const express = require('express');

var app = express();

const port = process.env.PORT || 3000

//server public folder
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.status(200).send();
});

app.listen(port, () => {
    console.log('server up on port 3000');
});
//listen on port 3000
//console log server up