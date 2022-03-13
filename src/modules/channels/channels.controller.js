//si lo exportamos como objeto podemos acceder a sus propiedad
const Channel = require('./channel.model');
const ObjectId = require('mongodb').ObjectId;
const channelController = {

    getAll: (req, res) => {

        const channel = new Channel();
        channel.getAll().then((results) => {
            res.send(results);
        });
    },
    getById: (req, res) =>{       
        var id = new ObjectId(req.params.id);
        const channel = new Channel();
        channel.getById(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    create: (req, res)=>{
        const channel = new Channel();
        var token = req.headers.authorization;
        if (!token) return res.sendStatus(401);
        channel.create(req.body, token).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(400);
            }
        });
    },
    createLink: (req, res)=>{
        var id = new ObjectId(req.params.id);
        console.log(id);
        const channel = new Channel();
        channel.createLink(id, req.headers.authorization).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    joinChannel: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const channel = new Channel();
        channel.joinChannel(req.body.link,id, req.headers.authorization).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    update: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const channel = new Channel();
        channel.update(id, req.body).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    delete: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const channel = new Channel();
        channel.delete(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    }
};

module.exports = channelController;