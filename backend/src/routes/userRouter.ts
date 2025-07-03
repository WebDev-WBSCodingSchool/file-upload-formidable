import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { userSchema } from '#schemas';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(validateBodyZod(userSchema), createUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(validateBodyZod(userSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
