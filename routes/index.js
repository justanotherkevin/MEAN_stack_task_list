const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('INDEX PAGE');
    res.render('index.html');
});

module.exports = router;
