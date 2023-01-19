const User = require('./User');
const Posting = require('./Post');

User.hasMany(Posting,{
    foreignkey: 'user_name',
    onDelete: 'CASCADE'
});

Posting.belongsTo(User,{
    foreignkey:'user_name'
});

module.exports = {User,Posting};