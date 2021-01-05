const dotenv = require('dotenv').config({path:`${__dirname}/config.env`});
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = process.env.DB_URL;
const messages = `${host}${username}${password}${url}/message`;
const db = require('mongoose');

db.Promise = global.Promise;
async function connect() {
    await db.connect(messages, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('[db] Conectada con éxito');
}

module.exports = connect;
