const Post = require('../models/post');
const { post } = require('../routes/posts');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}

module.exports.destroy = async function(req, res){
    try{
        let post = Post.findById(req.params.id, function(err, post){});

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({
                post : req.params.id
            });
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error', err);
        return;
    }

        // .id means converting object id into string
    
}