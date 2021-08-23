const { Vote } = require('../models');
const { VoteType } = require('../models');
const { User } = require('../models');
const { Post } = require('../models');

module.exports = (app) => {
  app.get('/votes', async (req, res) => {
      const votes = await Vote.findAll();
      return res.send(votes);
  }); //Listar todos

  app.post('/votes', async (req, res) => {
      const { type_id, post_id } = req.body;
      const { id: user_id } = req.decoded;

        try {

            if (!type_id || typeof type_id !== 'number' || type_id === 0) {
                return res.status(400).send('field "type_id" was not present');
            }
    
            const typeId = await VoteType.findOne({ where: { id: type_id } } )

            if(!typeId){
                return res.status(400).send('field "type_id" was not exists');
            }

            if (!post_id || typeof post_id !== 'number' || post_id === 0) {
                return res.status(400).send('field "post_id" was not exists');
            }

            const postId = await Post.findOne({ where: { id: post_id } } )

            if(!postId){
                return res.status(400).send('field "post_id" was not exists');
            }

            const vote = await Vote.create({ type_id, user_id, post_id });
            return res.json(vote);

        } catch (error) {
            console.log(error.message);
        } 
        return res.status(400).send("Failed to create vote!");
  }); // Criar

  app.put('/votes/:id', async (req, res) => {
    const { id } = req.params;
    const { type_id, post_id } = req.body;
    const { id: user_id } = req.decoded;

    try {
        
        if (!id || id === '' || id === 0) {
            return res.status(404).send('not found');
        }
        const vote = await Vote.findOne({ where: { id } });

        if (!vote) {
            return res.status(404).send('not found');
        }

        if (vote.dataValues.user_id !== user_id) {
            return res.status(403).send('unauthorized!');
        }

        if (!type_id || !vote.dataValues.type_id || typeof type_id !== 'number' || type_id === 0) {
            return res.status(400).send('field "type_id" was not valid');
        }

        if (!post_id || !vote.post_id || vote.post_id !== post_id ||typeof post_id !== 'number' || post_id === 0) {
            return res.status(400).send('field "post_id" was not valid');
        }

        vote.type_id = type_id;

        await vote.save();
        return res.send(vote);

    } catch (error) { 
        console.log(error.message);  
    }
    return res.status(400).send("Failed to edit vote!");
  }); //Editar

  app.delete('/votes/:id', async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.decoded;

    if (!id || id === '' || id === 0) {
        return res.status(404).send('not found');
    }
    const vote = await Vote.findOne({ where: { id } });

    if (!vote) {
        return res.status(404).send('not found');
    }

    if (vote.dataValues.user_id !== user_id) {
        return res.status(403).send('unauthorized!');
    }

    await vote.destroy();
    return res.send(vote);
  }); //Deletar
};