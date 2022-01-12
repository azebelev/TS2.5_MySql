import { Router, Request, Response } from 'express';
const router = Router();
import { User } from '../model/userModel';
import { UserObj } from '../interfaces/mysqlTypes';

router.post('/', async (req: Request, res: Response) => {
  const { login, pass } = req.body;

  const user: UserObj = await User.findOne({ login, pass });
  if (user) {
    req.session.user_id = user.id;
    req.session.save();
    res.status(200).send({ 'ok': true });
  } else {
    res.status(404).send({ 'error': 'not found' });
  }
});

export default router;