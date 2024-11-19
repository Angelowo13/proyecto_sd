import  express  from 'express';
import { estado_espejo, registrar_tarea_espejo, vertarea_espejo } from '../controller/app.controller.js';

const router = express.Router();


router.post('/espejo/registrar-tarea', registrar_tarea_espejo);
router.post('/espejo/ver-tarea', vertarea_espejo);
router.post('/espejo/actualizar-estado', estado_espejo);
//creacion de rutas 

export default router;
