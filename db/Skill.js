const { conn } = require('./conn');
const { STRING } = conn.Sequelize;

const Skill = conn.define('skill', {
    name:{
        type: STRING
    }
})

module.exports = { Skill };