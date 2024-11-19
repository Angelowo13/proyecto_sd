import {pool} from '../database.js'


export const registro = async (req, res) => {
    const {nombre, email, contrasena} = req.body;
    // validar que los campos no estén vacíos
    if(!nombre || !email || !contrasena){
        return res.status(400).json({message: 'Debe llenar todos los campos'});
    }
    try {
        // validar que no esté repétido el email
        const [verificar] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
        if(verificar.length > 0){
            return res.status(400).json({message: 'Este email ya está registrado'})
        }
        // insertar al nuevo usuario en la base de datos
        const [registro] = await pool.query(
            'INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?,?,?)', [nombre, email, contrasena]
        );
        return res.status(201).json({
            message: 'El usuario se ha registrado con exito', nombre, email
        });
    } catch (error) {
        // se atrapan los errores
        console.error(error);
        return res.status(500).json({message: 'Ocurrió un error al registrar al usuario'});
    }
}