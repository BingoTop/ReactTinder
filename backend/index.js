const express = require('express');
const app = express();
const PORT = 5000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

// application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({ extended: true })
);

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get('/', (req, res) => {
    res.send('hello man');
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입 시 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err)
            return res.json({
                success: false,
                err,
            });
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 DB에서 있는지 확인
    User.findOne(
        { email: req.body.email },
        (err, user) => {
            if (!user) {
                return res.json({
                    loginSuccess: false,
                    msg:
                        '제공된 이메일에 해당하는 유저가 없습니다.',
                });
            }
            // 비밀번호 같은지 확인 같으면 생성
            user.comparePassword(
                req.body.password,
                (err, isMatch) => {
                    if (!isMatch)
                        return res.json({
                            loginSuccess: false,
                            msg:
                                '비밀번호가 틀렸습니다.',
                        });

                    user.generateToken(
                        (err, user) => {
                            if (err)
                                return res
                                    .status(400)
                                    .send(err);

                            // 토큰을 저장한다.
                            res.cookie(
                                'x_auth',
                                user.token
                            )
                                .status(200)
                                .json({
                                    loginSuccess: true,
                                    userId:
                                        user._id,
                                });
                        }
                    );
                }
            );
        }
    );
});

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과했다면 authentication이 True
    res.status(200).json({
        _id: req.user._id,
        isAdmin:
            req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, user) => {
            if (err)
                return res.json({
                    success: false,
                    err,
                });
            return res.status(200).send({
                success: true,
            });
        }
    );
});

app.get('/api/hello', (req, res) => {
    res.send('hello bitch!');
});

app.listen(PORT, () => {
    console.log(`this is your port ${PORT}`);
});
