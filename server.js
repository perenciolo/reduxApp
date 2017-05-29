"use strict"

var express = require('express');
var app = express();
var path = require('path');

// middleware to define public folder static files
app.use(express.static('public'));

// responde to default route 
app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// add listener to port 3000
app.listen(3000, () => console.log('Sever running on port 3000'));

