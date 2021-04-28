const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService();

const NodemailerService = require('../services/nodemailer.service');
const _nodemailer = new NodemailerService();

const ExcelService = require('../services/excel.service');
const _excel = new ExcelService();

/**
 * Consultar todas las personas
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getPersonas = async (req, res) => {
    try {
        let sql = 'SELECT * FROM personas';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            estado: true,
            mensaje: "Personas consultadas",
            contenido: rows,
            
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error consultando las personas",
            contenido: error.message,
        });
    }
};

/**
 * Consultar todas las personas para llevarlas a un report csv
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getReportePersonas = async (req, res) => {
    try {
        let sql = 'SELECT * FROM personas';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        _excel.enviarReporte(rows);
        return res.send({
            estado: true,
            mensaje: "Se ha creado el reporte",
            contenido: 'localhost:3001/static/reporte.csv',
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error consultando las personas",
            contenido: error.message,
        });
    }
};

/**
 * Consultar una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getPersona = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM personas WHERE id='${id}'`;
        let result = await _pg.executeSql(sql);
        let row = result.rows[0];
        return res.send({
            estado: true,
            mensaje: "Persona consultada",
            contenido: row,
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error consultando la persona específica",
            contenido: error,
        });
    }
};

/**
 * Crear una persona y envía un correo a su respectivo email
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createPersona = async (req, res) => {

    try {
        let persona = req.body;
        let sql = `INSERT INTO public.personas ("name", email) VALUES('${persona.name}', '${persona.email}');`;
        let result = await _pg.executeSql(sql);
        let cuerpo = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
            <body bgcolor="#f6f8f1">
                <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td>
                            <table class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td class="header" bgcolor="#c7d8a7">
                                        <h2 class="subtitle">¡¡Bienvenido ${persona.name}!!<h2>
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
        </html>`;
        let resultEmail = await _nodemailer.enviarCorreo(persona.email, persona.name, cuerpo);
        return res.send({
            estado: result.rowCount == 1,
            mensaje: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
            contenido: persona,
            informacionEmail:{
                destinatario: resultEmail.accepted[0],
                asunto: _nodemailer.mailOptions.subject
            }
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error creando la persona",
            contenido: error.message,
        });
    }
};

/**
 * Actualizar una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const updatePersona = async (req, res) => {
    try {
        let id = req.params.id;
        let persona = req.body;
        let sql = `UPDATE public.personas SET "name"='${persona.name}', email='${persona.email}' WHERE id='${id}'`;
        let result = await _pg.executeSql(sql);
        return res.send({
            estado: result.rowCount == 1,
            mensaje: result.rowCount == 1 ? "Persona actualizada" : "La persona no fue actualizada",
            contenido: persona,
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error actualizando la persona",
            contenido: error,
        });
    }
};

/**
 * Eliminar una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const deletePersona = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM public.personas WHERE id=${id};`;
        let result = await _pg.executeSql(sql);
        return res.send({
            estado: result.rowCount == 1,
            mensaje: result.rowCount == 1 ? "Persona eliminada" : "La persona no fue eliminada",
            contenido: id,
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error eliminando la persona",
            content: error,
        });
    }
};

module.exports = { getPersonas, getReportePersonas, getPersona, createPersona, updatePersona, deletePersona };