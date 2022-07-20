const { conn } = require('./conn');
const { STRING, INTEGER} = conn.Sequelize;
const { Client } = require('./Client');
const { Skill } = require('./Skill');

const ClientSkills = conn.define('clientSkills', {
    clientId:{
        type: INTEGER,
        allowNull: false
    },
    skillId: {
        type: INTEGER,
        allowNull: false
    }
})

ClientSkills.belongsTo(Client);
ClientSkills.belongsTo(Skill);


module.exports = { ClientSkills };