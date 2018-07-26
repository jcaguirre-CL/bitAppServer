const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        // user: 'mcr.13.cl@gmail.com',
        user: 'soportebitc13@gmail.com',
        // pass: 'Canal13.!',
        pass: 'ingeadmin',
    },
});
module.exports = function sendEmail(cc, subject, message) {
    const mailOptions = {
        from: 'soportebitc13@gmail.com',
        to: 'jcaguirre@13.cl',
        cc,
        subject,
        html: message,
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
        }
    })
}