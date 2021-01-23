const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('enterHome')
})

module.exports = router