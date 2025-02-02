const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    }, function(email, password, done){
        // find a user and establish identity
        User.findOne({email : email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            else if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false); // second argument is for authentication :: true => user, false => false
            }
            else{
                return done(null, user);
            }
        });
    }
));

// serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// desrialising the user fron the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user -->Passport");
            return done(err);
        }
        else{
            return done(null, user);
        }
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){

    // if user is signed in pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req. user contains current signed in user from session cookie & just sending it to the locals for the views
        res.locals.user = req.user;
    }
    
    next();
}

module.exports = passport;