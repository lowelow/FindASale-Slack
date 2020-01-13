'use strict'

const express = require('express');
const cors    = require('cors');
const db      = require('./db');

// ROUTES IMPORT
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

// CONSTANTS
const PORT = 3000;
const HOST = '0.0.0.0';

// APP
const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors())

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
