import  express  from 'express';
import { login } from '../controller/app.controller';

const router = express.Router();
 
//creacion de rutas 
router.post ('/login',login)
export default router;
