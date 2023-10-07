const express = require("express");
const router = express.Router();
const {Blog} = require("../db");

router.post('/guardar', async (req, res) => {
    const formData = req.body; // Datos del formulario enviados desde el cliente
  
    try {
     const blogss= await Blog.create({ formData });
      res.status(200).send(blogss);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).send('Error al guardar los datos');
    }
  });

router.get("", async (req,res) =>{
    try {
        const blogs = await Blog.findAll();
        if(!blogs){
            return res.status(404).send("blogs Not Found")
        }
        return res.status(200).send(blogs);
    } catch(error){
        res.status(404).send(error);
    }
})

// User Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const blog = await Blog.findOne({
            where: {id:id}
        });
       
        if(!blog){
            return res.status(404).send("blog Not Found");
        }

        return res.status(200).send(blog)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.post('', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const blogExist = await Blog.findOne({ where: { title: title } });
  
      if (!blogExist) {
        const blog = await Blog.create({
          title: title,
          content: content,
        });
  
        return res.status(201).send(blog);
      }
      
      return res.status(409).json({ message: 'El artículo ya existe' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  });
  

// get users
router.get("", async (req,res) =>{
    try {
        const blogs = await Blog.findAll();
        if(!blogs){
            return res.status(404).send("blogs Not Found")
        }
        return res.status(200).send(blogs);
    } catch(error){
        res.status(404).send(error);
    }
})

// Service Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const blog = await Blog.findOne({
            where: {id:id}
        });
       
        if(!blog){
            return res.status(404).send("blog Not Found");
        }

        return res.status(200).send(blog)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try{
        const blog = await Blog.findByPk(id);
       
        if(!blog){
            return res.status(404).send("blog Not Found");
        }
        blog.formData = data.formData;
        console.log("blog.data",blog.formData)
        await blog.save();

        return res.status(200).send(blog)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const blog = await Blog.findByPk(id);
       
        if(!blog){
            return res.status(404).send("blog Not Found");
        }
        await blog.destroy();

        return res.status(200).send(blog)

    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router;