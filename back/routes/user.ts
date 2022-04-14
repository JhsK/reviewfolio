import axios, { AxiosRequestConfig } from 'axios';
import bcrypt from 'bcrypt';
import express from 'express';
import passport from 'passport';
import Programmer from '../models/programmer';
import User from '../models/user';
import { isLoggedIn, isNotLoggedIn } from './middleware';

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  const user = req.user?.toJSON();
  if (user?.position === 'programmer') {
    const programmerData = await Programmer.findOne({
      where: { UserId: req.user?.id },
    });
    user.career = programmerData?.career;
    user.programmerId = programmerData?.id;
    user.point = programmerData?.point;
  }
  delete user.password;
  console.log(user);
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  const encodeedKey = await Buffer.from(`${process.env.TOSS_SECRET_KEY}:`, 'utf8').toString('base64');

  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });

    const nickUser = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exUser) {
      return res.status(403).json('이미 사용 중인 아이디입니다');
    }

    if (nickUser) {
      return res.status(403).json('이미 사용 중인 닉네임입니다');
    }
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    const newUser = await User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
      userName: req.body.userName,
      career: req.body.career,
      position: req.body.position,
      job: req.body.job,
      birthday: req.body.birthday,
    });

    if (req.body.position === 'programmer') {
      await Programmer.create({
        UserId: newUser.id,
        career: req.body.career,
        bank: req.body.bank,
        accountNumber: req.body.accountNumber,
        subMallId: `reviewfolio${req.body.userId}`,
      });

      const subMallData = {
        subMallId: `reviewfolio${req.body.userId}`,
        companyName: `reviewfolio${req.body.userId}`,
        representativeName: req.body.userName,
        businessNumber: '0000000000',
        account: {
          bank: req.body.bank,
          accountNumber: req.body.accountNumber,
        },
      };

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://api.tosspayments.com/v1/payouts/sub-malls',
        headers: {
          Authorization: `Basic ${encodeedKey}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(subMallData),
      };

      const { data: apiResult } = await axios(config);
    }

    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr: Error) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: ['id', 'nickname', 'userId'],
        });
        return res.json(fullUser);
      } catch (err) {
        console.error(err);
        return next(err);
      }
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.send('logout 성공');
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      attributes: ['id', 'nickname'],
    });
    if (!user) {
      return res.status(404).send('no user');
    }
    const jsonUser = user.toJSON();
    return res.json(jsonUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put('/change-password', isLoggedIn, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: req.user?.id },
      },
    );

    return res.json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/change-info', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id },
    });

    const newUser = await User.update(
      {
        userName: req.body.userName,
        job: req.body.job,
      },
      {
        where: { id: req.user?.id },
      },
    );

    if (user?.position === 'programmer') {
      await Programmer.update(
        {
          career: req.body.career,
        },
        {
          where: { UserId: req.user?.id },
        },
      );
    }

    return res.json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
