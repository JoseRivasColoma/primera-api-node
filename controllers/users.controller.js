const { response, request } = require('express')

const usuariosGet = (req=request, res = response) => {
    const {q, nombre} = req.query;
    res.json({
        ok: true,
        message: 'get API - controlador',
        q,
        nombre
    })
}
const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        ok: true,
        message: 'post API - controlador',
        nombre,
        edad,
    })
}
const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        ok: true,
        message: 'put API - controlador',
        id
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        message: 'delete API - controlador'
    })
}
const usuariosPatch = (req, res = response) => {
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