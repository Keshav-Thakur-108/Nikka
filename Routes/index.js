const express = require('express')
const router = express.Router();
const Url = require('../models/Url')
const randomString = require('randomString')
const sendmail = require("../mail");

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




router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Url.findOne({slug: req.params.id}, (err, foundUrl) => {
        console.log("Found Url", foundUrl)
        if(err)
        console.log(err)
        else res.redirect(foundUrl.webUrl)
        
    })
})

router.post('/sendMail', (req, res) => {
    const output =
        `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Message: ${req.body.message}</li>
    </ul>
  
  `

    sendmail(output, function (err, data) {
        if (err) {
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }

        else {
            res.redirect("/");
        }


    })
})


module.exports = router