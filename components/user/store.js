const Model = require('./model');

function addUsers(user) {
    const myUser = new Model(user);
    myUser.save();
}

async function getUsers(filterChat) {
    const users = await Model.find();
    return users;
    // return new Promise((resolve, reject) => {
    //     let filter = {};
    //     if (filterChat !== null) {
    //         filter = { chat: filterChat };
    //     }
    //     Model.find(filter)
    //         .populate('user')
    //         .exec((error, populated) => {
    //             if (error) {
    //                 reject(error);
    //                 return false;
    //             }

    //             resolve(populated);
    //         });
    // })
}

function removeUser(id) {
    return Model.deleteOne({
        _id: id
    });
}

async function updateUser(id, name) {
    const foundUser = await Model.findOne({
        _id: id
    });

    foundUser.name = name;

    const newName = await foundUser.save();
    return newName;
}
module.exports = {
    add : addUsers,
    list: getUsers,
    update:updateUser,
    delete:removeUser
    //get
    //update
    //delete
}