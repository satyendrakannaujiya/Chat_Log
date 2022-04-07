
const {connection} = require('./dbConnection');


function saveChat(chatDetails,userId){
                return new Promise  ((resolve,reject)=>{
                                let message = chatDetails.message;
                                let timestamp = chatDetails.timestamp;
                                let isSent = chatDetails.isSent;
                                var sql = `INSERT INTO chat (user_id, message,time_stamp,isSent) VALUES ('${userId}','${message}','${timestamp}','${isSent}')`;
                                
                                    connection.query(sql,function(err,result){
                                        if(err){
                                            reject(err);
                                        }
                                        resolve(result.insertId);
                                    });
            });
    
}

function getChat(user_id,queryParam){
        let limit=10;
        if(queryParam.limit){
                limit = queryParam.limit;
        }
    return new Promise((resolve,reject)=>{
    
                        var sql = `select message,time_stamp,isSent from chat where user_id='${user_id}' order by time_stamp desc limit ${limit}`;
                        
                            connection.query(sql,function(err,result){
                                if(err){
                                    reject(err);
                                }
                                resolve(result);
                            });
    });

}



function deleteByUser(user_id){

    return new Promise((resolve,reject)=>{
       
                        var sql = `delete from chat where user_id='${user_id}'`;
                        
                            connection.query(sql,function(err,result){
                                if(err){
                                    reject(err);
                                }
                                resolve("Delete Successfully");
                            });
                        
                    
          
    });
}


function deleteByMessageId(user_id,message_id){

    return new Promise((resolve,reject)=>{
                        var sql = `delete from chat where user_id='${user_id}' and message_id='${message_id}'`;
                        
                            connection.query(sql,function(err,result){
                                if(err){
                                    reject(err);
                                }
                             
                                resolve("Deleted Successfully by message ID");
                            });
       
    });
}



function checkForMessageId(message_id){

    return new Promise((resolve,reject)=>{
       
                        var sql = `select count(1) as count from chat where message_id='${message_id}'`;
                        
                            connection.query(sql,function(err,result){
                                if(err){
                                    reject(err);
                                }
                                //console.log(result.count);
                                resolve(result);
                            });
                        
                    
          
    });
}


module.exports =  {saveChat,getChat,deleteByUser,deleteByMessageId,checkForMessageId};

