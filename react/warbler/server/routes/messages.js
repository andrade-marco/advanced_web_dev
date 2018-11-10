const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams option allows for access to id inside route

const { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

//Routes - prefix: /api/users/:id/messages (mergeParams allows to access this :id)
router.route('/').post(createMessage);

//prefix: /api/users/:id/messages/:message_id
router.route('/:message_id')
      .get(getMessage)
      .delete(deleteMessage);

module.exports = router;
