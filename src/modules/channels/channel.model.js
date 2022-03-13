const res = require('express/lib/response');
const Database = require('../../core/database');
const jwt = require('jsonwebtoken');

class Channel {
    collection;
    constructor(){
        //set collection
        this.collection = Database.collection('channels');
    }

    getAll(){
        return new Promise((success, reject) =>{
            this.collection.find().toArray((err, results) =>{
                if(err) reject(err);
                else success(results);
            });
        })
    }
    getById(idParam){
        return new Promise((success, reject) =>{
            this.collection.find({_id: idParam}).toArray((err, result) =>{
                if(err) reject(err);
                else success(result);
            });
        })
    }
    create(body, token){
        jwt.verify(token, 'secretKey', (err, resolve)=>{
            if(err) return err
            else{
                return new Promise((success, reject) =>{
                    try{
                        this.collection.insertOne(body)
                        success('channel succesfully added');
                    }catch(e){
                        reject(e)
                    }
                })
            }
        });
    }
    createLink(idChannel, token){
        if(token == null){ //no se ha iniciado sesion
            return new Promise((success, reject) =>{
                try{
                    this.collection.updateOne({_id: idChannel}, { $set: { link: ('www.'+idChannel+'.com')}}, {upsert: true})
                    success('channelLink with id '+idChannel+' was succesfully created');
                }catch(e){
                    reject(e);
                }
            })
        }else{
            jwt.verify(token, 'secretKey', (err, resolve)=>{
                if(err) return err
                else{
                    return new Promise((success, reject) =>{
                        try{
                            this.collection.updateOne({_id: idChannel}, { $set: { link: ('www.'+idChannel+'.com')}}, {upsert: true})
                            success('channelLink with id '+idChannel+' was succesfully created');
                        }catch(e){
                            reject(e);
                        }
                    })
                }
            });
        }
    }
    joinChannel(channelLink, idParam, token){
        if(token == null){ //no se ha iniciado sesion
            return new Promise((success, reject) =>{
                try{
                    this.collection.findOne({link: channelLink}, { $set: { newMember: idParam}}, {upsert: true})
                    success('user with id '+idParam+' was succesfully added to channel '+channelLink);
                }catch(e){
                    reject(e);
                }
            })
        }else{
            jwt.verify(token, 'secretKey', (err, resolve)=>{
                if(err) return err
                else{
                    return new Promise((success, reject) =>{
                        try{
                            this.collection.findOne({link: channelLink}, { $set: { newMember: idParam}}, {upsert: true})
                            success('user with id '+idParam+' was succesfully added to channel '+channelLink);
                        }catch(e){
                            reject(e);
                        }
                    })
                }
            });
        }
    }
    update(idParam, jsonBody){
        return new Promise((success, reject) =>{
            try{
                this.collection.updateOne({_id: idParam}, { $set: jsonBody}, {upsert: true})
                success('channel with id '+idParam+' was succesfully updated');
            }catch(e){
                reject(e);
            }
        })
    }
    delete(idParam){
        return new Promise((success, reject) =>{
            try{
                this.collection.remove({_id: idParam});
                success('channel succesfully deleted!');
            }catch(e){
                reject(e)
            }
        })
    }
}

//nos conviene que sea clase por la herencia
module.exports = Channel;