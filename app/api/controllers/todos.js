const todoModel = require('../models/todos');
module.exports = {
  create: function (req, res, next) {
    todoModel.create({ task: req.body.task, due: req.body.due, user: req.body.user }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Task added successfully!!!", data: null });
    });
  },
  update: function (req, res, next) {
    todoModel.update({ _id: req.body.id }, { $set: { status: req.body.status } }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Task updated successfully!!!", data: null });
    });
  },
  delete: function (req, res, next) {
    todoModel.remove({ _id: req.body.id }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Task Removed successfully!!!", data: null });
    });
  },
  list: function (req, res, next) {
    todoModel.find({ user: req.body.user }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", data: result });
    });
  }
}