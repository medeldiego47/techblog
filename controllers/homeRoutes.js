const sequelize = require('../config/connection');
const { Posting, User} = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/withAuth');

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/', withAuth, async (req, res) => {
  try {
    
    const postData = await Posting.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],order: [
        ['date_created', 'ASC'],
    ],
    });

   
    const posts = postData.map((posts) => posts.get({ plain: true }));

    
    res.render('posts', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/signup', async (req,res)=>{
  try{
    res.render('signup');
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    }) 
    res.render('login');
  } else {
    res.status(404).end();
  }
});


  module.exports = router;