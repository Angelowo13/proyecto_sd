import {pool} from '../database.js'

export const login = async (req,res) => {
    
    try {
        const { email, contrasena } = req.body;
        if (!email || !contrasena) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }
        
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'El correo no existe' });
        }

        const usuario = rows[0]; 
        if (contrasena !== usuario.contrasena) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: usuario });

    } catch (error) {
        console.error('Error al procesar la solicitud de inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

