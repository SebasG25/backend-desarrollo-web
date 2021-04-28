const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const transporter = require('../../services/nodemailer.service');

const mailOptions = {
    from: 'prueba.backend25@gmail.com',
    to: 'bitas200225@gmail.com',
    subject: 'prueba',
    text: 'mensaje',
    html: '<h1>Esto es una prueba</h1>'
};

const enviarCorreo = (req, res) => {
    let mailOptions = {
        from: 'prueba.backend25@gmail.com',
        to: 'bitas200225@gmail.com',
        subject: 'prueba',
        text: 'mensaje',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>A Simple Responsive HTML Email</title>
                <style type="text/css">
                .subtitle{text-align: center; color: "#000000";}
                .header {padding: 40px 30px 20px 30px;}
                body {margin: 0; padding: 0; min-width: 100%!important;}
                .content {width: 100%; max-width: 600px;}  
                #link{font-size: medium;}
                .footer{text-align: center;}
                </style>
            </head>
            <body yahoo bgcolor="#f6f8f1">
                <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td>
                            <table class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td class="header" bgcolor="#c7d8a7">
                                        <h2 class="subtitle">Bienvenido "Persona"<h2>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                    <tfooter class="footer">
                    <a id="link" href="https://github.com/SebasG25/backend-desarrollo-web">Link del repositorio</a>
                    </tfooter>
                </table>
            </body>
        </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {

        try {
            return res.send({
                estado: true,
                mensaje: "Email enviado",
                destinatario: mailOptions.to,
                contenido: mailOptions.subject,
            });
        } catch (error) {
            return res.send({
                estado: false,
                mensaje: "Ha ocurrido un error enviando el email",
                contenido: error,
            });
        }
    });
};

const createReporte = (req, res) => { //TODO Realizar creación de reporte .csv con ayuda de exceljs
    return res.send('Create reporte');
};

module.exports = { createReporte, enviarCorreo };