const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.show);
router.post('/', userController.find);
router.get('/adduser', userController.adduserform);
router.post('/adduser', userController.create);


//Router
router.get('', (req, res) => {
  res.render('home');
});

module.exports = router;