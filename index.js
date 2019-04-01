const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.set('port', process.env.PORT || 3000);


/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://drink-gram:drink100gram@ds129536.mlab.com:29536/drink-gram', { useNewUrlParser: true });

app.listen(app.get('port'), () => {
    console.log('server started');
});

module.exports = app;
