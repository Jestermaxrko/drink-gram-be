const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const routes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use('/', routes);
app.use('/users', userRoutes);

app.set('port', process.env.PORT || 3000);


/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err)
});


mongoose.connect('mongodb://drink-gram:drink100gram@ds129536.mlab.com:29536/drink-gram', { useNewUrlParser: true });

app.listen(app.get('port'), () => {
    console.log('server started');
});

module.exports = app;
