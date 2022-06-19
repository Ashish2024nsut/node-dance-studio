const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port  = 3000;
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');

//database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database connected successfully!!!!😱");
}).catch(err=>{
    console.log(err.message);
});

//define mongoose schema
const schema = new mongoose.Schema({
    name : String,
    phone: Number,
    name : String,
    email: String,
    address: String,
    desc : String
});

const ContactModel = mongoose.model('Contact',schema);

//app config
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//pug config
app.set('view-engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render(`home.pug`,params);
});

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render(`contact.pug`,params);
});

app.post('/contact',(req,res)=>{
    const contact = new ContactModel(req.body);
    contact.save().then(()=>{
        res.status(200).send("your request has been saved successfully!!");
    }).catch(err=>{
        console.log(err.message);
        res.status(404).json({"error" : `${err.message}`});
    });

});


app.listen(port,()=>{
    console.log('server is running on port 3000');
});