import { Request, Router } from 'express'

const router = Router();
import { deleteOneUser, postOneUser, getAllUser, getOneUser, updateOneUser } from '../../controllers/User/user.controller';
import multer from 'multer';
import { authenticate } from '../../middlewares/auth.middleware';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })


router.get('/' , authenticate(), getAllUser);

router.get('/:id', authenticate(), getOneUser);

router.post('/update/:id',authenticate(), upload.single('userAvatar'), updateOneUser);

router.delete('/delete/:id', authenticate(), deleteOneUser);

router.post('/add', authenticate(), upload.single('userAvatar'), postOneUser);



export default router;