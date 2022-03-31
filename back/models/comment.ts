import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

enum EnumPosition {
  'student',
  'programmer',
}

class Comment extends Model {
  public readonly id!: number;
  public content!: string;
  public position!: EnumPosition; 
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
    position: {
      type: DataTypes.ENUM,
      values: ['student', 'programmer'],
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Comment.belongsTo(db.Application);
  db.Comment.belongsTo(db.User);
  db.Comment.belongsTo(db.RequestPost);
};

export default Comment;
