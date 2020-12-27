const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({ extended: true })
);

// application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use(
    '/api/subscribe',
    require('./routes/subscribe')
);
app.use(
    '/api/like',
    require('./routes/like')
);

app.use(
    '/api/comment',
    require('./routes/comment')
);

app.use('/uploads', express.static('uploads'));
const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('MongoDB connected..');
    })
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`this is your port ${PORT}`);
});
