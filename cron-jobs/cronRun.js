const cron = require('node-cron');

const sendingEmailToUsers = require('./cronJobs');
const {CRON_JOB_PERIOD} = require('../config');

module.exports = () => {
    cron.schedule('* * * * *', async () => {
        console.log(`CRON JOB STARTED AT ${new Date().toISOString()}`)

        try {
            await sendingEmailToUsers();
        } catch (e) {
            console.log(`CRON JOB FINISHED AT ${new Date().toISOString()} \n ${JSON.stringify(e, null, 2)}`)
        }

        console.log(`CRON JOB FINISHED AT ${new Date().toISOString()}`)
    })
}
