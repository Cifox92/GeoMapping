module.exports = app => {

    app.use('/api/routes', require('./routes.routes'))
    app.use('/api', require('./auth.routes'))
}