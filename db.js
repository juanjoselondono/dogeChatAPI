const dotenv = require('dotenv').config({path:`${__dirname}/.env`});
const url = process.env.DB_URL;
const messages = `${url}/message`;
const db = require('mongoose');
console.log(messages)
db.Promise = global.Promise;
async function connect() {
    await db.connect(messages, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('[db] Conectada con éxito');
}

module.exports = connect;
