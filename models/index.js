const User = require('./User');
const Posting = require('./Post');
const Comment = require('./Comment')
User.hasMany(Posting,{
    foreignkey: 'user_id'
});

Posting.belongsTo(User,{
    foreignkey:'user_id'
});

Comment.belongsTo( User,{
    foreignKey: 'user_id'    
})

Comment.belongsTo( Post,{
    foreignKey:'post_id'})

User.hasMany(Comment,{
    foreignKey: 'user_id'
})

Post.hasMany(Comment,{
    foreignKey: 'post_id'
})

module.exports = {User,Posting,Comment};