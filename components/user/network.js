const express = require('express')

//const app = express();
const response = require('../../network/response')
const router = express.Router();
const controller = require('./controller')

router.get('/', (req, res)=>{
    const filterUser = req.body.name || null;
    controller.getUser(filterUser)
        .then((data)=>{
            response.success(req, res, 200,data)
        })
        .catch((e)=>{
            response.error(req, res,500,'Error geting the message');
            console.log(e)
        })
}) 
router.post('/', (req, res)=>{
    controller.addUser(req.body.name, req.body.mail, req.body.password)//escribe los datos recibidos
        .then(()=>{
            response.success(req, res, 200,"Everything is O.K") //verifica si los datos se enviaron completamene
            console.log(req.body.name)
            console.log(req.body.mail)
        })
        .catch((e)=>{
            response.error(req, res, 400,"Message or user not defined") //hace el catch del error
        })
})
router.patch('/:id', (req, res)=>{
    controller.updateUser(req.params.id, req.body.name)
        .then((data)=>{
            response.success(req,res,200, data)
        })
        .catch(e=>{
            response.error(req, res, 500, "Internal server error")
            console.error(e)
        })
})
router.delete('/:id', (req,res)=>{
    controller.deleteUser(req.params.id)
        .then(()=>{
            response.success(req,res,200, `User [${req.params.id}] deleted`)
        })
        .catch(e=>{
            response.error(req, res, 500, e);
        })
})
module.exports = router