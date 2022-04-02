import express from 'express';
import Order from '../models/order';
import User from '../models/user';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const data = await Order.findAll({});
  console.log(data);
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      tossOrderId: req.body.orderId,
      orderNickName: req.body.nickname,
      paymentKey: req.body.paymentKey,
      amount: req.body.amount,
      num: req.body.num,
      UserId: req.user?.id,
    });

    const user = await User.findOne({
      where: { id: req.user?.id },
    });

    await User.update(
      {
        ticket: user?.ticket + req.body.num,
      },
      {
        where: { id: req.user?.id },
      },
    );

    return res.json(newOrder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
