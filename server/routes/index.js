module.exports = app => {

    // Base URLS
    app.use('/api/routes', require('./routes.routes'))
    app.use('/api', require('./auth.routes'))
}