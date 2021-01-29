const nodemailer = require("nodemailer"),
    mailGun = require("nodemailer-mailgun-transport");

const auth = {
    auth: {
        api_key: "9ddc0eae2dad79a4c430b732283618b1-f135b0f1-b20d9451",
        domain: "sandbox542db175dfd74b33ac8253500c1f070c.mailgun.org"
    }

};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = function (output, cb) {
    const mailOptions = {
        from: "keshavthakur.001@gmail.com",
        to: "keshavthakur.001@gmail.com",

        html: output
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    })
}

module.exports = sendMail;