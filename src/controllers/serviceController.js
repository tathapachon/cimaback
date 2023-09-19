const express = require("express");
const router = express.Router();
const {Service} = require("../db")

router.get("", async (req,res) =>{
    try {
        const services = await Service.findAll();
        if(!services){
            return res.status(404).send("Services Not Found")
        }
        return res.status(200).send(services);
    } catch(error){
        res.status(404).send(error);
    }
})


// User Id 

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const service = await Service.findOne({
            where: {id:id}
        });
       
        if(!service){
            return res.status(404).send("Service Not Found");
        }

        return res.status(200).send(service)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.post('', async (req, res) => {
    const { title, service } = req.body;
    try {
     
      const serviceExist = await Service.findOne({ where: { title: title} });
     
      if (!serviceExist) {

       const services= await Service.create({
        title: title,
        service: service 
        });
     
  
        return res.send(services)
    }} catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  });



router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try{
        const services = await Service.findByPk(id);
       
        if(!services){
            return res.status(404).send("Service Not Found");
        }
        services.title = data.title;
        services.service =data.service;
        await services.save();

        return res.status(200).send(services)

    } catch (error) {
        res.status(404).send(error)

    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const service = await Service.findByPk(id);
       
        if(!service){
            return res.status(404).send("Service Not Found");
        }
        await service.destroy();

        return res.status(200).send(service)

    } catch (error) {
        res.status(404).send(error)

    }
})

module.exports = router;