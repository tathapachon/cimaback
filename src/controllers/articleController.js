const express = require("express");
const router = express.Router();
const {Article} = require("../db")

router.get("", async (req,res) =>{
    try {
        const articles = await Article.findAll();
        if(!articles){
            return res.status(404).send("Articles Not Found")
        }
        return res.status(200).send(articles);
    } catch(error){
        res.status(404).send(error);
    }
})

// User Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const article = await Article.findOne({
            where: {id:id}
        });
       
        if(!article){
            return res.status(404).send("Article Not Found");
        }

        return res.status(200).send(article)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.post('', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const articleExist = await Article.findOne({ where: { title: title } });
  
      if (!articleExist) {
        const article = await Article.create({
          title: title,
          content: content,
        });
  
        return res.status(201).send(article);
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
        const articles = await Article.findAll();
        if(!articles){
            return res.status(404).send("Articles Not Found")
        }
        return res.status(200).send(articles);
    } catch(error){
        res.status(404).send(error);
    }
})

// Service Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const article = await Article.findOne({
            where: {id:id}
        });
       
        if(!article){
            return res.status(404).send("Article Not Found");
        }

        return res.status(200).send(article)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try{
        const article = await Article.findByPk(id);
       
        if(!article){
            return res.status(404).send("Article Not Found");
        }
        article.data = data.data;
        
        await article.save();

        return res.status(200).send(article)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const article = await Article.findByPk(id);
       
        if(!article){
            return res.status(404).send("Article Not Found");
        }
        await article.destroy();

        return res.status(200).send(article)

    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router;