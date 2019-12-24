const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello worlds');
});
app.listen(3000);