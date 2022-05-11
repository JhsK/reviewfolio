import Application, { associate as associateApplication } from './application';
import Comment, { associate as associateComment } from './comment';
import CommentFile, { associate as associateCommentFile } from './commentFile';
import File, { associate as associateFile } from './file';
import Image, { associate as associateImage } from './image';
import Order, { associate as associateOrder } from './order';
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
  Comment,
  Order,
  Image,
  CommentFile,
}

export type dbType = typeof db;

associateUser(db);
associateTicket(db);
associateRequest(db);
associateProgrammer(db);
associatePayment(db);
associateFile(db);
associateApplication(db);
associateComment(db);
associateOrder(db);
associateImage(db);
associateCommentFile(db);