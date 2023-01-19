const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',(req,res)=>{
    Comment.findAll({}).then(data=>res.json(data))
})

router.get('/:id',(req,res)=>{
    Comment.findOne({
        where: {
            id:req.params.id
        }
    }).then(data => res.json(data))
})