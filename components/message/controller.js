const e = require("express")
const store = require('./store');
const socket = require("../../socket").socket;
function addMessage(chat,user, message, file){
    return new Promise((resolve, reject)=>{
        let fileUrl = '';
        if (file){
            fileUrl = "http://localhost:3000/files/" + file.filename
        }
        const fullmessage = {
            chat: chat,
            user : user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }
        if(!user || !message || !chat){
            console.error('[messsage/controller] Message, chat or user not defined')
            reject();
        }
        // socket.io.emit('message',fullmessage)
        store.add(fullmessage)
        console.log(fullmessage)
        resolve(fullmessage);
    })
}
function getMessage(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser)) 
    })
}
async function updateMessage(id, message){
    return new Promise(async(resolve, reject)=>{
        if(!id || !message){
            reject('[messsage/controller] Invalid data');
            return false;
        }
        const result = await store.update(id, message);
        resolve(result)
    })
}
function deleteMessage(id){
    return new Promise((resolve,reject)=>{
        if(!id){
            reject('[message/controller] Id not defined');
            return false;
        }
        store.delete(id)
            .then(()=>{
                resolve();
            })
            .catch(e=>{
                console.error(e)
            })
    })
}
module.exports ={
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage
};