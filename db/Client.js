const { conn } = require('./conn');
const { STRING } = conn.Sequelize;

const Client = conn.define('client', {
    name:{
        type: STRING
    },
})

module.exports = { Client };