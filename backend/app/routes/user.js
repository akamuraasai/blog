const { User } = require('../models');

module.exports = (app) => {
  app.post('/register', async (req, res) => {
    const { body } = req;
    const user = await User.create(body);
    res.json(user);
  });

  app.get('/users', (req, res) => {}); //Listar todos
  app.post('/users', (req, res) => {}); // Criar
  app.get('/users/:id', (req, res) => {}); //Buscar
  app.put('/users/:id', (req, res) => {}); //Editar
  app.delete('/users/:id', (req, res) => {}); //Deletar
};
