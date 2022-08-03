  const router = require('express').Router();
  const middleware = require('../modules/service/middleware');
  const CreateController = require('../controllers/CreateController');
  const taskController = require('../controllers/taskController');
  const custItemValidation = require('../models/validatior/custItem');
  const userValidation = require('../models/validatior/User');
  const itemValidation = require('../models/validatior/item');
  const taskValidation = require('../models/validatior/task');
  router.post('/user-create',middleware(userValidation.create),CreateController.userCreate);
  router.post('/item-create', middleware(itemValidation.create), CreateController.itemCreate);
  router.post('/cust-item', middleware(custItemValidation.create), CreateController.custItemCreate);

  router.delete('/delete-item', taskController.itemDelete);

  router.post('/same-address', middleware(taskValidation.address), taskController.sameAddress);

  router.post('/same-color', taskController.sameColor);

  router.post('/name-lies', taskController.nameLies);

  router.post('/less-weight', taskController.lessWeight);

  router.post('/next-month', taskController.nextMonth);

  router.post('/phone-start', taskController.phoneStart);

  router.post('/total-price', taskController.totalPrice);

  router.post('/maximum-purchased', taskController.maximumPurchased);

  router.post('/total-price-item-wise', taskController.totalPriceItemWise);

  router.post('/customer-detail-qty ', taskController.customerDetailQty);
  
  module.exports = { router };