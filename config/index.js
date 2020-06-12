module.exports = {
    PORT: process.env.PORT || 4400,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'email',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'pass',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '* * * * *',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4400'
}
