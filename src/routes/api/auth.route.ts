import {Router} from 'express'
import { loginIn,refreshToken } from '../../controllers/Auth/auth.controller';

const router = Router();

router.post('/login', loginIn);

router.post('/token', refreshToken);

export default router;