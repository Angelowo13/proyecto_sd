import {pool} from '../database.js'


// creacion de consultas sql
export const registro = async (req, res) => {
    const {nombre, correo, contraseña} = req.body;

    // validar que los campos no estén vacíos
    if(!nombre || !correo || !contraseña){
        return res.status(400).json({message: 'Debe llenar todos los campos'});
    }


    try {
        // validar que no esté repétido el correo
        const [verificar] = await pool.promise().execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if(verificar.length > 0){
            return res.status(400).json({message: 'Este correo ya está registrado'})
        }
        // insertar al nuevo usuario en la base de datos
        const [registro] = await pool.promise().execute(
            'INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?,?,?)', [nombre, correo, contraseña]
        );

        return res.status(201).json({
            message: 'El usuario se ha registrado con exito', usuario: nombre, correo
        });
    } catch (error) {
        // se atrapan los errores
        console.error(error);
        return res.status(500).json({message: 'Ocurrió un error al registrar al usuario'});
    }
}