console.log('inside users contoller');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "User Profile"
    });
    //  res.end('<h1> User profile </h1>');
};

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    });
};

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title : " Codeial | Sign In"
    });
};