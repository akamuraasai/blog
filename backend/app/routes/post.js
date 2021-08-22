const { Post } = require('../models');

  app.get('/posts', (req, res) => {
      Post.findAll();
  }); //Listar todos

  app.post('/posts', async (req, res) => {
      const {body} = req;
      const post = await  Post.create();
      res.Json(Post);
  }); // Criar

  app.get('/posts/:id', (req, res) => {
    const {body} = req;
    const post = await  Post.findAt();
    res.Json(Post);
  }); //Buscar

  app.put('/posts/:id', (req, res) => {}); //Editar

  app.delete('/posts/:id', (req, res) => {}); //Deletar