const express = require('express');
const app = express();
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const port = 6500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(port, () => console.log(`running on ${port}`))