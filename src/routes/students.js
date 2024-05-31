// src/routers/students.js

import { Router } from 'express';
import { getStudentsController, getStudentByIdController, createStudentController, deleteStudentController, upsertStudentController, patchStudentController } from '../controllers/students';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import { updateStudentSchema } from '../validation/students';
import { createStudentSchema } from '../validation/students';

const router = Router();



router.get('/students', ctrlWrapper(getStudentsController));
router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));
router.post('/students', validateBody(createStudentSchema), ctrlWrapper(createStudentController));
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));
router.put('/students/:studentId ', validateBody(updateStudentSchema), ctrlWrapper(upsertStudentController));
router.patch('/students/:studentId',validateBody(updateStudentSchema), ctrlWrapper(patchStudentController));


export default router;
