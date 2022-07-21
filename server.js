const express = require('express');
const app = express();
const path = require('path');
const { seeder } = require('./db/index');
const { Client } = require('./db/Client');
const { Skill } = require('./db/Skill');
const { ClientSkills } = require('./db/ClientSkills');



app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/clients', async(req, res, next) =>{
  try {
    res.send(await Client.findAll());
  } catch (ex) {
    next(ex)
  }
})

app.get('/api/clientSkills', async(req, res, next) =>{
  try {
    res.send(await ClientSkills.findAll());
  } catch (ex) {
    next(ex)
  }
})

app.get('/api/skills', async(req, res, next) =>{
  try {
    res.send(await Skill.findAll());
  } catch (ex) {
    next(ex)
  }
})

app.put('/api/skills/:id', async(req, res, next) =>{
  try {
    const skill = await Skill.findByPk(req.params.id);
    await skill.update(req.body);
    res.send(skill);
  } catch (ex) {
    next(ex)
  }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});



const init = async()=> {
  try {
    await seeder();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
