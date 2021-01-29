const express = require('express')
const router = express.Router();
const Url = require('../models/Url')
const randomString = require('randomString')

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

router.post('/shorten-url', (req, res) => {
    const url = new Url();
    url.slug = randomString.generate(5)
    url.webUrl = req.body.url
    url.save((err, newUrl) => {
        if(err)
        res.redirect('/')
        else 
        res.render('shortUrl', {
            slug: newUrl.slug,
            fullUrl: newUrl.webUrl
        })
        
    })

})

router.get('/asdf', (req, res) => {
    res.render('shortUrl')
})


router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Url.findOne({slug: req.params.id}, (err, foundUrl) => {
        console.log("Found Url", foundUrl)
        if(err)
        console.log(err)
        else res.redirect(foundUrl.webUrl)
        
    })
})


module.exports = router