const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.show);


//Router
router.get('', (req, res) => {
  res.render('home');
});

module.exports = router;