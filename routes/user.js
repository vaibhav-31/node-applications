const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router
  .get('/', userController.getUsers)
  .patch('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

exports.router = router;  