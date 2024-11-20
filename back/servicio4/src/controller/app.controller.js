import {pool} from '../database.js'
const transformarTexto = (texto) => texto.toUpperCase().replace(/ /g, '_');

export const registrar_tarea_espejo = async (req, res) => {
    try {
        let { id_usuario, titulo, descripcion, fecha_i, fecha_t } = req.body;

        // Transformar los valores
        titulo = transformarTexto(titulo);
        descripcion = transformarTexto(descripcion);

        const [row] = await pool.query(
            'INSERT INTO tareas (id_usuario, titulo, descripcion, fecha_inicio, fecha_termino, estado) VALUES (?, ?, ?, ?, ?, "Pendiente")',
            [id_usuario, titulo, descripcion, fecha_i, fecha_t]
        );

        const tareaId = row.insertId;

        // Recuperar la tarea recién insertada
        const [tarea] = await pool.query('SELECT * FROM tareas WHERE id = ?', [tareaId]);
        res.status(200).json({ message: 'Tarea registrada (espejo)', row, tarea });
    } catch (error) {
        res.status(500).json({ message: 'ERROR: No se registró la tarea en el espejo' });
    }
};

// Función espejo para obtener tareas
export const vertarea_espejo = async (req, res) => {
    const { id_usuario } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE id_usuario = ?', [id_usuario]);

        // Transformar cada tarea en la lista
        const tareasTransformadas = rows.map((tarea) => ({
            ...tarea,
            titulo: transformarTexto(tarea.titulo),
            descripcion: transformarTexto(tarea.descripcion),
        }));
        
        res.status(200).json({ tareasTransformadas });
    } catch (error) {
        res.status(500).json({ message: 'ERROR: No se pudo obtener las tareas en el espejo' });
    }
};

// Función espejo para cambiar el estado
export const estado_espejo = async (req, res) => {
    try {
        let { id, estado } = req.body;

        // Transformar el estado
        estado = transformarTexto(estado);

        const [row] = await pool.query(
            'UPDATE tareas SET estado = ? WHERE id = ?',
            [estado, id]
        );

        if (row.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la tarea en el espejo' });
        }

        res.status(200).json({ message: 'Estado actualizado correctamente (espejo)', id, nuevoEstado: estado });
    } catch (error) {
        res.status(500).json({ message: 'ERROR: No se pudo actualizar el estado en el espejo' });
    }
};