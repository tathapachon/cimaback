const express = require("express");
const router = express.Router();
const {User} = require("../db");
const paginationMiddleware = require("../middleware/paginationMiddleware.js")
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
router.use(paginationMiddleware);
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    try {
      const { page, limit, offset } = req.pagination;
  
      const users = await User.findAll({
        offset: offset,
        limit: limit,
      });
  
      if (!users) {
        return res.status(404).send("Users Not Found");
      }
  
      return res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
 
  // Ruta para buscar usuarios por nombre o email
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
      console.log("query",query)
  
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } }, // Búsqueda por nombre (case-insensitive)
            { email: { [Op.iLike]: `%${query}%` } }, // Búsqueda por email (case-insensitive)
          ],
        }
      });
  
      if (!users) {
        return res.status(404).send("Users Not Found");
      }
  console.log("users",users)
      return res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// User Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id:id}
        });
       
        if(!user){
            return res.status(404).send("User Not Found");
        }

        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)

    }
})
router.put('/reset', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Verificar y decodificar el token
      const SECRET = 'mysecretkey';
      const decodedToken = jwt.verify(token, SECRET);
  console.log("decodedToken ",decodedToken )
  console.log("decodedToken.userId",decodedToken.userId)
      // Buscar al usuario en la simulación de la base de datos
      const user = await User.findByPk(decodedToken.userId);
  console.log("user",user)
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }
  
      // Actualizar la contraseña del usuario en la base de datos
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.send({ msg: 'Password updated successfully' });
    }catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).send({ msg: 'An error occurred while updating the password' });
  }
  
  });
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body
    console.log("data",data)
    try{
        const user = await User.findByPk(id);
       
        if(!user){
            return res.status(404).send("User Not Found");
        }
        user.name = data.name;
        user.email = data.email;
        user.lastname = data.lastname
        await user.save();

        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findByPk(id);
       
        if(!user){
            return res.status(404).send("User Not Found");
        }
        await user.destroy();

        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router;