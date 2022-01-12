import { Router } from 'express'
import { Request, Response } from 'express'
const router = Router()
import { User } from '../model/userModel'

router.get('/', async (req: Request, res: Response) => {
  const user_id = req.session.user_id;
  if (!user_id) {
    res.status(403).send({ error: 'forbidden' })
  } else {
    const tasks = await User.findTasksByUserId(user_id);
    res.status(200).send({ items: tasks });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { text } = req.body;
  const user_id = req.session.user_id;
  const task_id = await User.addNewTask(text, user_id);

  res.status(201).send({ id: task_id });
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await User.deleteTaskById(id);
  } catch (error) {
    res.status(500).send({});
  }
  res.status(200).send({ ok: true });
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const { id, text, checked } = req.body;
    await User.updateTask({ id, text, checked });
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({});
  }
});

export default router;