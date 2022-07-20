const { conn } = require('./conn');
const { Client } = require('./Client');
const { Skill } = require('./Skill');
const { ClientSkills } = require('./ClientSkills');

const seeder = async() =>{
    await conn.sync({force: true});
    const [moe, larry, lucy, ethyl] = await Promise.all(
        ['moe', 'larry', 'lucy', 'ethyl'].map(name => Client.create({name}))
    )

    const [dancing, singing, plateSpinning] = await Promise.all(
        ['dancing', 'singing', 'plateSpinning'].map(name => Skill.create({name}))
    )

    await Promise.all(
        [
            ClientSkills.create({
                clientId: moe.id,
                skillId: dancing.id
            }),
            ClientSkills.create({
                clientId: moe.id,
                skillId: singing.id
            }),
            ClientSkills.create({
                clientId: lucy.id,
                skillId: singing.id
            })
        ]
    )
}

module.exports = { seeder };