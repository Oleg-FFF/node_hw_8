const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const {PORT} = require('./config');
const {cronRun} = require('./cron-jobs');

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, 'public')));

const { authRouter, userRouter, productRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/product', productRouter);

cronRun();

const db = require('./dataBase').getInstance();
db.setModels();

app.use('*', (err, req, res, next) => {
    let message = err.message

    if (err.parent) {
        message = err.parent.sqlMessage
    }
    res
        .status(err.status || 400)
        .json({
            message,
            code: err.customCode
        })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listen ${PORT}...`);
    }
})

process.on("unhandledRejection", reason => {
    console.log('_______________________');
    console.log(reason);
    console.log('_______________________');

    process.exit(0)
})
