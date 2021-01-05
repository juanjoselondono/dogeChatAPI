const e = require("express");

var success = (req, res,Status,message)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(Status).send({
        "Status": Status,
        "Message": message
    })

}
var error = (req, res, Status,message)=>{
    res.status(Status).send({
        "Status": "Internal Issue",
        "Message": message
    })
}
exports.success = success;
exports.error = error;