


//DEPENDENCY IMPORTS
const express  = require('express')
const {MongoClient} = require('mongodb')
const serverApp = express();
const connectionString ='mongodb+srv://user1:gokul1234@cluster0.s8vlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const bodyParser = require("body-parser");


//MIDDLE WARE CONFIGS
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.set('view enginer', 'ejs')
serverApp.use(express.static('public'))

//\\-----ROUTES------//\\

//MONGO CONNECT
MongoClient.connect(connectionString, (err,client) => {
    //ERROR HANDLING
    if(err){
        return console.error(err)
    }
    //RETRIEVE THE DB
    const projectDB = client.db('project')
    const projectCollection = projectDB.collection('project');
    console.log('retrieved the db');

      
    //CREATE user information
        serverApp.post('/createUser',(req,res) => {
            //apply promise on this
            projectCollection.insertOne(req.body)
            .then(result => {console.log('the query added to the db ')})
            .then(result => {res.redirect('http://localhost:3000/discovery')})
            .catch(error => console.error(error));
          
        });

    
   
});
serverApp.listen(8080, ()=>{
    console.log('listening 8080')
});




