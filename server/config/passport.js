const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Dog = mongoose.model("dogs");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_JWT;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Dog.findById(jwt_payload.id)
                .then(dog => {
                    if (dog) {
                        return done(null, dog);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};