import { Router, Request, Response } from 'express';
const router = Router();
import { User } from '../model/userModel';
import { UserObj } from '../interfaces/mysqlTypes';

router.all('/', async (req: Request, res: Response) => {

  switch (req.query.action) {

    case 'login': {
      const { login, pass } = req.body;

      const user: UserObj = await User.findOne({ login, pass });
      if (user) {
        req.session.user_id = user.id;
        req.session.save();
        res.status(200).send({ 'ok': true });
      } else {
        res.status(404).send({ 'error': 'not found' });
      }
      break;
    }
    case 'register': {
      const { login, pass } = req.body;
      const user: UserObj = await User.findOne({ login, pass });
      if (!user) {
        await User.addNewUser({ login, pass });
        res.status(201).send({ 'ok': true });
      } else {
        res.status(400).send({});
      }
      break;
    }
    case 'getItems': {
      const user_id = req.session.user_id;
      if (!user_id) {
        res.status(403).send({ error: 'forbidden' });
      } else {
        const tasks = await User.findTasksByUserId(user_id);
        res.status(200).send({ items: tasks });
      }
      break;
    }
    case 'deleteItem': {
      try {
        const { id } = req.body;
        await User.deleteTaskById(id);

      } catch (error) {
        console.log(error);
        res.status(500).send({});

      }
      res.status(200).send({ ok: true });
      break;
    }
    case 'createItem': {
      const { text } = req.body;
      const user_id = req.session.user_id;
      const task_id = await User.addNewTask(text, user_id);

      res.status(201).send({ id: task_id });
      break;
    }
    case 'editItem': {
      try {
        const { id, text, checked } = req.body;
        await User.updateTask({ id, text, checked });
        res.status(200).send({ ok: true });
      } catch (error) {
        res.status(500).send({});
      }
      break;
    }
    default: {
      req.session.destroy((error) => {
        if (!error) res.clearCookie('connect.sid').json({ ok: true });
        res.status(200).send({ "ok": true });
      });
      break;
    }
  }
})

export default router;