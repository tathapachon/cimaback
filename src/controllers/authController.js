const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../db");
const bcrypt = require('bcryptjs');
const {mailPayment}  = require('../middleware/nodemailer-config.js');

router.post('/register', async (req, res) => {
  const { lastname,email, password, name } = req.body;
  try {
   
    const userExist = await User.findOne({ where: { email: email } });
    const SECRET = 'mysecretkey';
    if (!userExist) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
        email: email,
       password:hashedPassword,
        name:name,
        lastname:lastname
      });
      if (newUser) {
        // Generar un token JWT
        const token = jwt.sign({ userId: newUser.id }, SECRET, { expiresIn: '1h' });

        // Construir la URL con el token
        const resetUrl = `http://localhost:5173/cambiar?token=${token}`;

        // Llamar a la función mailPayment() con los argumentos necesarios
        mailPayment(email, name, resetUrl);

        return res.send({ msg: "User Registered" });
      } else {
        return res.status(500).json({ message: 'Error creating user' });
      }

  }} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});
router.put('/decode-token', async (req, res) => {
  const { token} = req.body;
  const SECRET = 'mysecretkey';
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
         // Verificar y decodificar el token
         const SECRET = 'mysecretkey';
         const decodedToken = jwt.verify(token, SECRET);
     console.log("decodedToken ",decodedToken )
     console.log("decodedToken.userId",decodedToken.id)
         // Buscar al usuario en la simulación de la base de datos
         const user = await User.findByPk(decodedToken.id);
     console.log("user",user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Token decoding error', error: error.message });
  }
});
router.put("/restablecer", async (req,res)=>{
  const {email} = req.body;
  const SECRET = 'mysecretkey';
  try{
    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
      return res.status(404).send({ msg: 'User not found' });
    }
    if(userExist){
      const token = jwt.sign({ userId: userExist.id }, SECRET, { expiresIn: '1h' });

      // Construir la URL con el token
      const resetUrl = `http://localhost:5173/cambiar?token=${token}`;

      // Llamar a la función mailPayment() con los argumentos necesarios
      mailPayment(email, userExist.name, resetUrl);

      return res.send({ msg: "User Registered" });
    }
  }catch (error) {
    res.status(401).json({ error: error.message });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authenticateUser(email, password);
    console.log("user, token",user, token)
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ user,token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});



module.exports = router;