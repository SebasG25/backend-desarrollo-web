const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

class ExcelService {
  constructor() {
    this.csvWriter = createCsvWriter({
      path: 'static/reporte.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Correo' },
      ]
    });
  }

  async enviarReporte(data) {
    const path = 'static/reporte.csv';
    try {
      fs.unlinkSync(path);
    } catch (error) {
      console.error('Error:', error);
    }
    await this.csvWriter.writeRecords(data)
  }
}

module.exports = ExcelService;
