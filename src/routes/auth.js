import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController, lodOutUserController, refreshUsersSession } from '../controllers/auth.js';



const router = Router();

router.post('/register', validateBody(registerUserSchema) , ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/post', ctrlWrapper(lodOutUserController));

router.get('/refresh', ctrlWrapper(refreshUsersSession));

export default router;