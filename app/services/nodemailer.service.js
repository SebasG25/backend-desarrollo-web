const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'prueba.backend25@gmail.com',
        pass: 'admin123*',
    }
});

module.exports = transporter;


