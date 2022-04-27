import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

enum ApplicationStatus {
  '리뷰 진행중',
  '리뷰 종료',
}

class Application extends Model {
  public readonly id!: number;
  public status!: ApplicationStatus;

  public RequestPostId?: any;
}

Application.init(
  {
    status: {
      type: DataTypes.ENUM,
      values: ['리뷰 진행중', '리뷰 종료'],
    },
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'application',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Application.belongsTo(db.Programmer);
  db.Application.belongsTo(db.RequestPost);
  db.Application.hasMany(db.Comment);
};

export default Application;
