import {pool} from '../database.js'


// creacion de consultas sql
export const registrar_tarea = async (req,res) => {
    try {
        const {id_usuario,titulo,descripcion,fecha_i,fecha_t}=req.body;
        if (!id_usuario|| !titulo|| !descripcion|| !fecha_i|| !fecha_t) {
         return res.status(400).json({message: 'Debe llenar todos los campos'});    
        }

        const [row] = await pool.query(
            'INSERT INTO tareas (id_usuario, titulo, descripcion, fecha_inicio, fecha_termino, estado) VALUES (?, ?, ?, ?, ?, "Pendiente")',
            [id_usuario, titulo, descripcion, fecha_i, fecha_t]
        );

        const tareaId = row.insertId;

        // Recuperar la tarea recién insertada
        const [tarea] = await pool.query('SELECT * FROM tareas WHERE id = ?', [tareaId]);
        res.status(200).json({message:'Tarea registrada',row,tarea})
    } catch (error) {
        res.status(500).json({message:'ERROR no se registrro la tarea'})
    }
}


export const vertarea = async (req,res) => {
    const {id_usuario} =req.body
    try {
        const [row] = await pool.query('select * from tareas where id_usuario = ?',id_usuario)
        console.log(row)
        res.status(200).json({row})

    } catch (error) {
        res.status(500).json({message:'ERROR no se pudo  la tarea'})
    }
    
}
export const estado = async (req, res) => {
    try {
        const { id, estado } = req.body;

        // Realizar la consulta de actualización
        const [row] = await pool.query(
            'UPDATE tareas SET estado = ? WHERE id = ?',
            [estado, id]
        );

        // Verificar si se actualizó alguna fila
        if (row.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la tarea con el ID especificado' });
        }

        // Respuesta exitosa
        res.status(200).json({ message: 'Estado actualizado correctamente', id, nuevoEstado: estado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ERROR: No se pudo actualizar el estado', error: error.message });
    }
}
