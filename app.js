const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


//load user model         models > User.js
require('./model/user');
const User = mongoose.model('UserS');


//mongodb connection
const mongoURI = "mongodb+srv://root:root@cluster0-ytrbi.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('MongoDB is connected..'))
.catch(err => console.log(err));


// ejs middle ware
app.set('view engine', 'ejs');


//middle ware for body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());





//routes
app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.post('/', (req,res)=> {
    const newUser = new User({
        email: req.body.eml,
        password: req.body.pswd
    })
    newUser.save().then(data => console.log(data))
    .catch( err =>console.log(err));

    res.redirect('/')
});



app.get('/list', (req, res) => {
    User.find()
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});