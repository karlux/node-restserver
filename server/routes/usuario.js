const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const { Mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("underscore");

//NOTA: Las .use son middleware, cada petición va a pasar primero por esos

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'role estado google nombre email')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.countDocuments({estado: true}, (err, cantidad) => {
                    if(err){
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    
                    res.json({
                        ok: true,
                        cantidad,
                        usuarios
                    });
                });
            });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((error, usuarioDB) => {
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    //_.pick(); permite filtrar los parámetros que vamos a permitir modificar
    // recibe el body donde está todo el objeto y después un arreglo con lo permitido de ese objeto
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (error, usuarioDB) =>{
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


// Borrado completo (físico) - No es conveniente
/* app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado){
            return res.status(200).json({
                ok: false,
                error: {
                    message: "El usuario no existe"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
}); */

// Borrado lógico - Es lo más adecuado
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true, runValidators: true}, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;