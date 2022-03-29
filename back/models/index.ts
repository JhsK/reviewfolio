import Application, { associate as associateApplication } from './application';
import File, { associate as associateFile } from './file';
import Payment, { associate as associatePayment } from './payment';
import Programmer, { associate as associateProgrammer } from './programmer';
import RequestPost, { associate as associateRequest } from './requestPost';
import TicketHistory, { associate as associateTicket } from './ticketHistory';
import User, { associate as associateUser } from './user';
export * from './sequelize';

const db = {
  User,
  TicketHistory,
  RequestPost,
  Programmer,
  Payment,
  File,
  Application,
}

export type dbType = typeof db;

associateUser(db);
associateTicket(db);
associateRequest(db);
associateProgrammer(db);
associatePayment(db);
associateFile(db);
associateApplication(db);