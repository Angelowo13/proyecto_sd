import {pool} from '../database.js'


// creacion de consultas sql
export const registrar_tarea = async (req,res) => {
    try {
        const {id_usuario,titulo,descripcion,fecha_i,fecha_t,estado}=req.body;
        const row =await pool.query(' INSERT INTO tareas (id_usuario, titulo, descripcion, fecha_inicio, fecha_termino, estado) VALUES (?, ?, ?, ?, ?, ?)'[id_usuario,titulo,descripcion,fecha_i,fecha_t,estado])
        res.estatus(200).json({message:'Tarea registrada',row})
    } catch (error) {
        res.estatus(500).json({message:'ERROR no se registrro la tarea'})
    }
}