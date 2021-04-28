const PostgresService = require('../../services/postgres.service');
const _reporteController = require('../reportes/reportes.controller');
const _pg = new PostgresService();


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
            contenido: error,
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
 * Crear una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createPersona = async (req, res) => {

    try {
        let persona = req.body;
        let sql = `INSERT INTO public.personas ("name", email) VALUES('${persona.name}', '${persona.email}');`;
        let result = await _pg.executeSql(sql);
        _reporteController.enviarCorreo.mailOptions
        return res.send({
            estado: result.rowCount == 1,
            mensaje: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
            contenido: persona,
        });
    } catch (error) {
        return res.send({
            estado: false,
            mensaje: "Ha ocurrido un error creando la persona",
            contenido: error,
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

module.exports = { getPersonas, getPersona, createPersona, updatePersona, deletePersona };