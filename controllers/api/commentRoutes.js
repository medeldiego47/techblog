const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',(req,res)=>{
    Comment.findAll({}).then(data=>res.json(data))
});

router.get('/:id',(req,res)=>{
    Comment.findOne({
        where: {
            id:req.params.id
        }
    }).then(data => res.json(data))
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                body: req.body.body,
                post_id: req.body.post_id,
            })
            .then(data => res.json(data))}
});