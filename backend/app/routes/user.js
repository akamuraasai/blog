const { User } = require('../models');

module.exports = (app) => {
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.length == 0) {
      return res.status(400).send('field "name" was not present');
    }

    if (!email || typeof email !== 'string' || email.length == 0) {
      return res.status(400).send('field "email" was not present');
    }

    if (!password || typeof password !== 'string' || password.length == 0) {
      return res.status(400).send('field "password" was not present');
    }

    const user = await User.create({ name, email, password });
    return res.json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();
    return res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || id === '') {
      return res.status(404).send('not found');
    }
    const user = await User.findOne({ where: { id } });
    return res.send(user);
  });

  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id || id === '') {
      return res.status(404).send('not found');
    }

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send('not found');
    }

    if (name && typeof name === 'string' && name.length > 0) {
      user.name = name;
    }

    if (email && typeof email === 'string' && email.length > 0) {
      user.email = email;
    }

    await user.save();
    return res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id === '') {
      return res.status(404).send('not found');
    }

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send('not found');
    }

    await user.destroy();
    return res.send(user);
  });
};
