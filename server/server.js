require("./config/config");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

//NOTA: Las .use son middleware, cada petición va a pasar primero por esos

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario/:id', (req, res) => {
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        });
    }else{ 
        res.json({
            persona: body
        });
    }
});

app.put('/usuario', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});

app.listen(process.env.PORT, () => {
    console.log(`El servicio está corriendo en el puerto ${process.env.PORT}`);
});