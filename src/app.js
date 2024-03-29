const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const fileUpload = require('express-fileupload');

const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

const { httpLogStream } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());
app.use(fileUpload());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error message",
        message: err.message
    });
    next();
});

module.exports = app;