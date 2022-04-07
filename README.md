# Chat_Log
Steps to Run this project<br />

1. Download this project<br />
2. Untar it and go to the project folder<br />
3. RUN - npm install<br />
4. Login to database and create a new database chat_log and a table chat using below command.<br />
create database chat_log;<br />
use chat_log;<br />
CREATE TABLE `chat` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_general_ci,
  `time_stamp` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isSent` int(11) DEFAULT NULL,
  PRIMARY KEY (`message_id`)
);<br />
6. open dbConnection.js and change db details<br />
7. Now run - nodemon index.js<br />
8. Now you can test the api end points , Below are the supported api endpoints<br />
GET - /api/chatlogs/:user --> To get all chat userwise here you can alsoo pass limit(/api/chatlogs/:user?limit=20) as query 
params by default it will show 10 latest chat. <br />
POST - /api/chatlogs/:user --> To create a new chat log<br />
DELETE - /api/chatlogs/:user --> To delete all chat of a user<br />
DELETE - /api/chatlogs/:user/:message_id --> To delete chat on the message_id.<br />
