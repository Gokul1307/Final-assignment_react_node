


//DEPENDENCY IMPORTS
const express  = require('express')
const morgan = require("morgan");
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js");
const Users = require("./users");

const {MongoClient} = require('mongodb')
const serverApp = express();
const connectionString ='mongodb+srv://user1:gokul1234@cluster0.s8vlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const bodyParser = require("body-parser");


//MIDDLE WARE CONFIGS
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.set('view enginer', 'ejs')
serverApp.use(express.static('public'))
serverApp.use(morgan("dev"));

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


serverApp.post("/api/GenerateJWT", (req, res) => {
    let { header, claims, key } = req.body;
    // In case, due to security reasons, if the client doesn't send a key,
    // use our default key.
    key = key || "$PraveenIsAwesome!";
    res.json(GenerateJWT(header, claims, key));
  });
 serverApp.post("/api/DecodeJWT", (req, res) => {
    res.json(DecodeJWT(req.body.sJWS));
  });
 serverApp.post("/api/ValidateJWT", (req, res) => {
    let { header, token, key } = req.body;
    // In case, due to security reasons, if the client doesn't send a key,
    // use our default key.
    key = key || "$GokulIsAwesome!";
    res.json(ValidateJWT(header, token, key));
  });
  
 serverApp.post("/api/Users/SignIn", (req, res) => {
    const { Username, Password } = req.body;
    // Check if the Username is present in the database.
    if (typeof Users[Username] !== "undefined") {
      // Check if the password is right.
      if (Users[Username] === Password) {
        // Let's create a JWT based on our default headers.
        const header = {
          alg: "HS512",
          typ: "JWT"
        };
        // Now we need to make the claims based on Username provided by the user.
        const claims = {
          Username
        };
        // Finally, we need to have the key saved on the server side.
        const key = "$GokulIsAwesome!";
        // Send a success message.
        // By default, the status code will be 200.
        res.json({
          Message: "Successfully Signed In!",
          JWT: GenerateJWT(header, claims, key)
        });
      } else {
        // Send a forbidden error if incorrect credentials.
        res.status(403).json({
          Message: "Invalid Username or Password!"
        });
      }
    } else {
      // Send a forbidden error if invalid username.
      res.status(403).json({
        Message: "User Not Found!"
      });
    }
  });







serverApp.listen(8080, ()=>{
    console.log('listening 8080')
});




