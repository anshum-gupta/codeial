// const { readyState } = require("../config/mongoose");
const Post = require('../models/post');
// const { post } = require("../routes");

module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial </h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    

    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts : posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec( function (err, posts) {
        console.log('posts = > ', posts);
        return res.render('home', {
            title : "Codeial | Home",
            posts : posts
            
        });
    });
    // populate the user of each post
}

// module.exports.actionName = function(req, res){}