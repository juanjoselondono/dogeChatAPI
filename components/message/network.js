const express = require('express')
const multer = require('multer')
const response = require('../../network/response')
const router = express.Router();
const controller = require('./controller')
var path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage});

router.get('/', (req, res)=>{
    const filterMessages = req.query.chat || null;
    controller.getMessage(filterMessages)
        .then((messageList)=>{
            response.success(req, res, 200,messageList)
        })
        .catch((e)=>{
            response.error(req, res,500,'Error geting the message');
            console.log(e)
        })
}) 
router.post('/', upload.single('file'),(req, res)=>{
    controller.addMessage(req.body.chat,req.body.user, req.body.message, req.file)//escribe los datos recibidos
        .then((fullMessage)=>{
            response.success(req, res, 201,fullMessage) //verifica si los datos se enviaron completamene
            console.log(req.body.message)
            console.log(req.body.user)
        })
        .catch((e)=>{
            response.error(req, res, 400,"Message or user not defined");
            console.log(e) //hace el catch del error
        })
})
router.patch('/:id', (req, res)=>{
    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req,res,200, data)
        })
        .catch(e=>{
            response.error(req, res, 500, "Internal server error")
            console.error(e)
        })
})
router.delete('/:id', (req,res)=>{
    controller.deleteMessage(req.params.id)
        .then(()=>{
            response.success(req,res,200, `User message [${req.params.id}] deleted`)
        })
        .catch(e=>{
            response.error(req, res, 500, e);
        })
})
module.exports = router