import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { userSchema } from '#schemas';
import { processFile } from '#middlewares';
import { cloaudUploader } from '#middlewares';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(validateBodyZod(userSchema), createUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(processFile, cloaudUploader, validateBodyZod(userSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
