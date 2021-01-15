const e = require("express")
const store = require('./store')
function addUser(name, mail, password){
    return new Promise((resolve, reject)=>{
        const fulluser = {
            name : name,
            mail: mail,
            password: password
        } 
        if(!name || !mail || !password){
            console.error('[messsage/controller] body not defined')
            reject();
        }
        else{
            store.add(fulluser)
            resolve(fulluser);
        }
    })
}
function getUser(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser)) 
    })
}
async function updateUser(id, name){
    return new Promise(async(resolve, reject)=>{
        if(!id || !name){
            reject('[messsage/controller] Invalid data');
            return false;
        }
        const result = await store.update(id, name);
        resolve(result)
    })
}
function deleteUser(id){
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
    addUser,
    getUser,
    updateUser,
    deleteUser
};