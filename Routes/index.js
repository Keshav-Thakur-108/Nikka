const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.name == undefined)
    res.render('enterHome')
    else 
    res.render('home')
    
})

module.exports = router