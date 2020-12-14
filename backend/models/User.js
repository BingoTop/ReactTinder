const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
const saltRounds = 10;


const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength: 50
    },
    email:{
        type:String,
        trim: true ,// 공백 Space를 없애준다. 
        unique:1
    },
    password:{
        type:String,
        maxlength:120
    },
    role:{
        type: Number,
        default: 0
    },
    image:String,
    token:{
        type:String // 유효성 검사
    },
    // 토큰 사용할 수 있는 기간
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
};

userSchema.methods.generateToken = function(cb){
    let user = this;

    //jsonWebToken 이용 토큰 생성
    let token = jwt.sign(user._id.toHexString(),"secretToken");
    
    user.token = token;
    user.save(function(err,user) {
        if(err)return cb(err)
        cb(null,user)
    })
};

userSchema.statics.findByToken = function(token,cb){
    let user = this;
    // 토큰을 decode
    jwt.verify(token,"secretToken",function(err,decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음
        // 클라이언트에서 가져온 쿠키와 디비에 보관된 토큰과 비교
        user.findOne({"_id":decoded,"token": token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    });

}
const User = mongoose.model('User',userSchema); // 모델의 이름

module.exports = {User};