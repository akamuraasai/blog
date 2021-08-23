const { Post } = require('../models');

module.exports = (app) => {
  app.get('/posts', async (req, res) => {
      const posts = await Post.findAll();
      return res.send(posts);
  }); //Listar todos

  app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || id === '') {
      return res.status(404).send('not found');
    }

    const post = await Post.findOne({ where: { id } });
    return res.send(post);
  }); //Buscar

  app.post('/posts', async (req, res) => {
      const { user_id: userId, post: body, title, banner } = req.body;

      if (!userId || typeof userId !== 'number' || userId === 0) {
        return res.status(400).send('field "user_id" was not present');
      }

      if (!body || typeof body !== 'string' || body.length === 0) {
        return res.status(400).send('field "post" was not present');
      }

      if (!title || typeof title !== 'string' || title.length === 0) {
        return res.status(400).send('field "title" was not present');
      }

      const post = await Post.create({ user_id: userId, post: body, title, banner });
      return res.json(post);

  }); // Criar

  app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const {  user_id: userId, post: body, title, banner } = req.body;

    if (!id || id === '' || id === 0) {
        return res.status(404).send('not found');
    }
    const post = await Post.findOne({ where: { id } });

    if (!post) {
        return res.status(404).send('not found');
    }

    if (userId || typeof userId === 'number' || userId > 0) {
        post.user_id = userId;
    }

    if (post || typeof post === 'string' || post.length > 0) {
        post.post = body;
    }

    if (title || typeof title === 'string' || title.length > 0) {
        post.title = title;
    }

    if(banner || typeof banner === 'string' || banner.length > 0 ){
        post.banner = banner;
    }

    await post.save();
    return res.send(post);
  }); //Editar

  app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id === '' || id === 0) {
        return res.status(404).send('not found');
    }
    const post = await Post.findOne({ where: { id } });

    if (!post) {
        return res.status(404).send('not found');
    }

    await post.destroy();
    return res.send(post);
  }); //Deletar
};