const express = require('express')
const router = express.Router();
const Url = require('../models/Url')
const randomString = require('randomstring')
const sgMail = require("@sendgrid/mail");
const config = require('../config/config')
sgMail.setApiKey(config.sgKey)


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


router.post('/sendMail', (req, res) => {
    const msg = {
      to: "keshavthakur.001@gmail.com",
      from: {
        email: "keshavthakur.001@gmail.com", // Use the email address or domain you verified above
        name: "New contact request",
      },
      subject: `New contact request by ${req.body.name}`,
      text: `Name: ${req.body.name} \nUser Email ID: ${req.body.email} \nPhone number: ${req.body.phone} \nMessage: ${req.body.message}`,
      html: 
                `<h1>New contact request</h1>
                <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>${req.body.name}</td>
                </tr>
                <tr>
                    <td>Email ID</td>
                    <td>${req.body.email}</td>
                </tr>
                <tr>
                    <td>Phone number</td>
                    <td>${req.body.phone}</td>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>${req.body.message}</td>
                </tr>
                </tbody>
                </table>`
    };
    
    sgMail.send(msg).then(
      () => {res.redirect('/')},
      (error) => {
        if (error.response) {
          console.log(error.response.body);
          res.redirect('/')
        }
      }
    );
})

router.get('/favicon.ico', (req,res)=>{
 return 'your faveicon'
})

router.get('/:id', (req, res) => {
    console.log("params slug id",req.params.id)
    Url.findOne({slug: req.params.id}, (err, foundUrl) => {
        console.log("Found Url", foundUrl)
        if(err)
        console.log(err)
        else res.redirect(foundUrl.webUrl)
        
    })
})

module.exports = router