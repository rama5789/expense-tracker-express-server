const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  res.json({
    status: 1,
    message: 'Server Home page',
    data: {
      viwedAt: new Date(),
    },
  });
});
