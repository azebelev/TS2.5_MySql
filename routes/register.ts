import { Router, Request, Response } from 'express';
const router = Router();
import { User } from '../model/userModel';
import { UserObj } from '../interfaces/mysqlTypes';

router.post('/', async (req: Request, res: Response) => {
  const { login, pass } = req.body;
  const user: UserObj = await User.findOne({ login, pass });
  if (!user) {
    await User.addNewUser({ login, pass });
    res.status(201).send({ 'ok': true });
  } else {
    res.status(400).send({});
  }
});

export default router;