const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getPersonas = async(req, res) => {
    let sql = 'SELECT * FROM personas';
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send(rows);
};

const createPersona = (req, res) => { // TODO completar createPersona
    return res.send('Create persona');
};

const updatePersona = (req, res) => {   // TODO completar updatePersona
    return res.send('Update persona');
};

const deletePersona = (req, res) => {   // TODO completar deletePersona
    return res.send('Delete persona');
};

module.exports = {getPersonas, createPersona, updatePersona, deletePersona};