const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mcr.13.cl@gmail.com',
        // user: 'bastianrojasdagnino@gmail.com',
        pass: 'Canal13.!',
        // pass: 'BaastianRojas020',
    },
});
module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'mcr.13.cl@gmail.com',
        to,
        subject,
        html: message,
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
