const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const createReporte = (req, res) => { //TODO Realizar creación de reporte .csv con ayuda de exceljs
    return res.send('Create reporte');
};

module.exports = { createReporte };