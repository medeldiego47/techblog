const router = require('express').Router();
const { User, Posting} = require('../../models');
const withAuth = require('../../utils/withAuth')
//get all route to see all posts
router.get('/', withAuth ,async (req, res) => {
    try {
      const postData = await Posting.findAll({
        attributes: ['id', 'name', 'description', 'date_created'],
        order: [['date_created', 'DESC']],
        include: [
          { model: User, attributes: ['name'] },
          {model: Comment,
          attributes:['id','body','post_id','user_id','date_created'],
          include: {
            model: User,
            attributes:['name']
          }
        },
         
         
        ],
      });
      res.status(200).json(postData.reverse());
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/:id', (req, res) => {
    Posting.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'description',
                'name',
                'date_created'
            ],
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'no matching post' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});




  router.post('/', withAuth, async (req, res) => {
    try {
      console.log('test')
      const newPost = await Posting.create({
        
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', withAuth, (req, res) => {
    Posting.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'no matching post' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});
  module.exports = router;