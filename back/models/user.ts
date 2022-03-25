import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class User extends Model {
  public readonly id!: number;
  public userName!: string;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public ticket?: number;
  public position!: string;
  public birthday!: string;
  public job!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ticket: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    position: {
      type: DataTypes.STRING(30),
    },
    career: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.STRING(30),
    },
    job: {
      type: DataTypes.ENUM,
      values: ['front', 'back', 'data', 'android', 'ios', 'devops'],
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.User.hasMany(db.RequestPost, { as: 'RequestPosts' });
  db.User.hasMany(db.TicketHistory, { as: 'TicketHistories' });
  db.User.hasMany(db.Payment, { as: 'Payments' });
};

export interface IUser extends User {}
export default User;
