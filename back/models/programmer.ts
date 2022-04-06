import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class Programmer extends Model {
  public readonly id!: number;
  public career!: number;
  public point!: number;
  public refundPoint!: number;
  public subMallId!: string;
  public bank!: string;
  public accountNumber!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public UserId?: number;
}

Programmer.init(
  {
    career: {
      type: DataTypes.INTEGER,
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    refundPoint: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    subMallId: {
      type: DataTypes.STRING(100),
    },
    bank: {
      type: DataTypes.STRING(50),
    },
    accountNumber: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    modelName: 'Programmer',
    tableName: 'programmer',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Programmer.belongsTo(db.User);
  db.Programmer.belongsToMany(db.RequestPost, { through: 'RequestReview' });
  db.Programmer.hasMany(db.Application, { as: 'Applications' });
};

export default Programmer;
