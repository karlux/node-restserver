require("./config/config");
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require("./routes/usuario"));

mongoose.connect(
    process.env.URLDB, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
    error =>{
        if(error) throw new Error(error);
        
        console.log('BBDD online');
});

// Deprecado: Se da en el curso de Fernando Herrera pero ya no sirve
/* mongoose.connect(`mongodb://localhost:27017/cafe`, (err) => {
    if(err) throw err;
    console.log('DDBB online');
}); */

app.listen(process.env.PORT, () => {
    console.log(`El servicio está corriendo en el puerto ${process.env.PORT}`);
});