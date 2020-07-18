module.exports = app => {

    // Base URLS
    app.use('/api/coasters', require('./coaster.routes'))
    app.use('/api', require('./auth.routes'))
}