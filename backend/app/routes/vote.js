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
      const { type_id, user_id, post_id } = req.body;

      if (!type_id || typeof type_id !== 'number' || type_id === 0) {
        return res.status(400).send('field "type_id" was not present');
      }
        try {
    
            const typeId = await VoteType.findOne({ where: { id: type_id } } )

            if(!typeId){
                return res.status(400).send('field "type_id" was not exists');
            }

            if (!user_id || typeof user_id !== 'number' || user_id === 0) {
                return res.status(400).send('field "user_id" was not exists');
            }

            const userId = await User.findOne({ where: { id: user_id } } )

            if(!userId){
                return res.status(400).send('field "user_id" was not exists');
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
  }); // Criar

  app.put('/votes/:id', async (req, res) => {
    const { id } = req.params;
    const { type_id, user_id, post_id } = req.body;

    try {
        
        if (!id || id === '' || id === 0) {
            return res.status(404).send('not found');
        }
        const vote = await Vote.findOne({ where: { id } });

        if (!vote) {
            return res.status(404).send('not found');
        }

        if (!type_id || !vote.dataValues.type_id || typeof type_id !== 'number' || type_id === 0) {
            return res.status(400).send('field "type_id" was not valid');
        }

        if (!user_id || !vote.user_id || vote.user_id !== user_id || typeof user_id !== 'number' || user_id === 0) {
            return res.status(400).send('field "user_id" was not valid');
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
  }); //Editar

  app.delete('/votes/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id === '' || id === 0) {
        return res.status(404).send('not found');
    }
    const vote = await Vote.findOne({ where: { id } });

    if (!vote) {
        return res.status(404).send('not found');
    }

    await vote.destroy();
    return res.send(vote);
  }); //Deletar
};