const store = require('./store');

function addChat(users, name) {
    if (!users || !Array.isArray(users)) {
        return Promise.reject('Invalid user list');
    }

    const chat = {
        users: users,
        name: name
    };
    return store.add(chat);
}

function listChats(userId) {
    return store.list(userId);
}
function deleteChat(id){
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

module.exports = {
    addChat,
    listChats,
    deleteChat
}