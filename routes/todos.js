const express = require('express');
const router = express.Router();
const todoController = require('../app/api/controllers/todos');
router.post('/create', todoController.create);
router.post('/update', todoController.update);
router.post('/delete', todoController.delete);
router.post('/list', todoController.list);
module.exports = router;