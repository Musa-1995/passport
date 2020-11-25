const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const models = require('../models');

const User = models.User;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'myverysecret'

module.exports = passport => {
    passport.use(new JwtStrategy(
        jwtOptions,(jwt_payload,done) => {
        User.findOne({where:{id:jwt_payload.id}})
        .then(user =>{
        console.log(user);
        console.log(jwt_payload);
        if(user){
            return done(null,user);
        }
        return done(null,false);
    })
    .catch(err =>{
        console.log(err);
    });
}
    ));
};