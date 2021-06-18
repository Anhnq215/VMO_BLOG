import { Router } from 'express'
import { deleteOneCategory, getAllCategory, getOneCategory, postOneCategory, updateOneCategory } from '../../controllers/Category/category.controller';

const router = Router();

router.get('/', getAllCategory);

router.get('/:id', getOneCategory);

router.post('/update/:id', updateOneCategory);

router.get('/delete/:id', deleteOneCategory);

router.post('/add', postOneCategory);

export default router;