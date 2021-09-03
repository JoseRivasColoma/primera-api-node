/* Controlador / Lógica de las rutas */
//Importación request y response desde express
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación de clases
const Usuario = require('../models/users.models');


const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({ estado: true });

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}
const usuariosPost = async (req = request, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)
    //Guardar en base de datos
    await usuario.save();
    res.json({
        message: 'post API - controlador',
        usuario
    })
}
const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id

    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos

    if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}
const usuariosDelete = async (req = request, res = response) => {
    const {id} = req.params;

    //Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false})
    res.json({
        usuario
    })
}
const usuariosPatch = (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
}