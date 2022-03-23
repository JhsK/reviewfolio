import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { sequelize } from './models';


dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065);
sequelize.sync({ force: false })
.then(() => {
  console.log('데이터베이스 연결 성공');
}).catch((err: Error) => {
  console.error(err);
});

app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('서버 실행 중');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${process.env.PORT}`);
})
