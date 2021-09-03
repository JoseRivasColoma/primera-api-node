const Role = require('../models/role.models');
const Usuario = require('../models/users.models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        console.log(existeRol);
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const esEmailExistente = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ya está registrado`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error(`El usuario no existe`);
    }
}



module.exports = {
    esRoleValido,
    esEmailExistente,
    existeUsuarioPorId
}