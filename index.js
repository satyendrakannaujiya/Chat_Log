
const express = require('express');
const {saveChat,deleteByUser,deleteByMessageId,getChat,checkForMessageId} = require('./model');

const app = express();

const PORT = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
       res.send("Please hit valid end point to get response ");
});

app.get('/api/chatlogs/:user',async (req,res)=>{
    try{
        let queryParam = req.query;
        let userList = await getChat(req.params.user,queryParam);
        res.send(userList);
    }catch(err){
        console.log("Some error occured while get the chats ",err);
        res.sendStatus(500);
    }
      
});


app.post('/api/chatlogs/:user',async (req,res)=>{
          try{
            let result = await saveChat(req.body,req.params.user);
            res.send({message_id:result});
          }catch(err){
              console.log("Some error occured in post",err);
              res.sendStatus(500);
          }
         
});

app.delete('/api/chatlogs/:user',async (req,res)=>{
    try{
        let result = await deleteByUser(req.params.user);
        res.send({"response":result});
    }catch(err){
        console.log("Some error occured in delete by user ",err);
        res.sendStatus(500);
    }
    
});

app.delete('/api/chatlogs/:user/:message_id',async (req,res)=>{
    try{
        let isMessageFound = await checkForMessageId(req.params.message_id);
        let count = isMessageFound[0].count;
        if(count<=0){
                    res.send("Message id is invalid");
        }else{
                  let result = await deleteByMessageId(req.params.user,req.params.message_id);
                  res.send({"response":result});
        }
    }catch(err){
        console.log("Some error occured in delete by message id ",err);
        res.sendStatus(500);
    }

});


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
});