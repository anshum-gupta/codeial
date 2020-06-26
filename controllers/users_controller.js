// console.log('inside users contoller');
const User = require('../models/user');
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title : "User Profile",
                    user : user
                    // cookie : req.cookies
                });
            }
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
    
    //  res.end('<h1> User profile </h1>');
};

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    });
};


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title : " Codeial | Sign In"
    });
};

//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up!');
            return;
        }
        else if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in finding user in signing up!');
                    return;
                }
                else return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // find the user
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signin in');
            return;
        }

        // handle user found
        if(user){
            // handle mismatching passwords
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            console.log("hello!!!!");
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            // handle user not found
            return res.redirect('back');
        }
    });
}

module.exports.destroySession = function(req, res){
    res.cookie('user_id', -1);
    return res.redirect('/users/sign-in');
}