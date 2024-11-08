import {pool} from '../database.js'

export const login = async (req,res) => {
    
    try {
         const {email , contrasena } = req.body
         const query  = await pool.query ('select * from usuarios where correo =  ? and contrasena = ?', [email,contrasena]);
         db.query(query, [email , contrasena], (err, result) => {
            if (err){
                console.error('Error al consultar la base de datos:', err);
                return res.status(500).json ({ message: 'Error en el servidor'});
            }
            if(result.length > 0) {
                res.status(200).json ({ message : 'Inicio de sesion exitoso'});
            }else {
                res.status(402).json ({message: 'Credenciales incorrectas'});
            }
         });
    } catch (error) {
        
    }
    
}

// creacion de consultas sql
