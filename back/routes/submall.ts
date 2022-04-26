import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import express from 'express';
import Programmer from '../models/programmer';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.post('/calculate', isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  const encodeedKey = await Buffer.from(`${process.env.TOSS_SECRET_KEY}:`, 'utf8').toString('base64');
  const programmer = await Programmer.findOne({
    where: { UserId: req.user?.id },
  });

  const subMallData = [{
    subMallId: programmer?.subMallId,
    payoutDate: dayjs().add(2, 'days').locale('ko').format('YYYY-MM-DD'),
    payoutAmount: req.body.account,
  }];

  const config: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/payouts/sub-malls/settlements',
    headers: {
      Authorization: `Basic ${encodeedKey}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(subMallData),
  };

  try {
    const { data: apiResult } = await axios(config);
    await Programmer.update(
      {
        point: (programmer?.point as number) - req.body.account,
        refundPoint: req.body.account,
      },
      {
        where: { UserId: req.user?.id },
      },
    );
    console.log(apiResult);
    return res.json(apiResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
