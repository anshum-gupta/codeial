console.log('inside users contoller');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "User Profile"
    });
    //  res.end('<h1> User profile </h1>');
};