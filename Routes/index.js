const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    if(req.cookies.name == undefined)
    res.render('enterHome')
    else 
    res.render('home')
    
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router