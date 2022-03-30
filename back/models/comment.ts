import { DataTypes, Model } from 'sequelize';
import { dbType } from '.';
import sequelize from './sequelize';

class Comment extends Model {
  public readonly id!: number;
  public content!: string;
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
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
};

export default Comment;
