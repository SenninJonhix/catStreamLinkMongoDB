const modelo = require('../modelo/modelo');

exports.control_lista = async (req, res) => {
    try {
        const usuarios = await modelo.find();
        res.status(200).json(usuarios);
    } catch(error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
}

exports.control_detalle = async (req, res) => {
    try {
        const usuario = await modelo.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
}

exports.control_crear = async (req, res) => {
    try {
        const nuevoUsuario = new modelo(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch(error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
}

exports.control_actualizar = async (req, res) => {
    try {
        const usuarioActualizado = await modelo.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!usuarioActualizado) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
}

exports.control_eliminar = async (req, res) => {
    try {
        const usuarioEliminado = await modelo.findByIdAndDelete(req.params.id);
        
        if (!usuarioEliminado) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}