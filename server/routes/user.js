var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Sample user');
});

router.get('/profile', (req,res, next) =>{
    res.send('Sample profile');
});

router.post('/user/comment', (req,res) =>{
    res.send('Sample comment');
    res.redirect(`/post?id=${id}`);
});

// router.post('user/login', jwt_validate, authenticate, (req,res) => {

// });

module.exports = router;