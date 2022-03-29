import { DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, Model } from 'sequelize';
import { dbType } from '.';
import File from './file';
import sequelize from './sequelize';

enum RequestStatus {
  'recurit',
  'ing,',
  'end',
}

enum RequestType {
  'portfolio',
  'resume',
  'consulting',
}

class RequestPost extends Model {
  public readonly id!: number;
  public title!: string;
  public maxReviewer?: number;
  public body!: string;
  public file!: string;
  public status?: RequestStatus;
  public type?: RequestType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addFiles!: HasManyAddAssociationsMixin<File, number>
  public addFile!: HasManyAddAssociationMixin<File, number>
}

RequestPost.init(
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    maxReviewer: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    file: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['recurit', 'ing', 'end'],
      defaultValue: 'recurit',
    },
    type: {
      type: DataTypes.ENUM,
      values: ['portfolio', 'resume', 'consulting'],
    }
  },
  {
    sequelize,
    modelName: 'RequestPost',
    tableName: 'requestPost',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.RequestPost.belongsToMany(db.Programmer, { through: 'RequestReview' });
  db.RequestPost.belongsTo(db.User);
  db.RequestPost.hasMany(db.File);
};

export default RequestPost;
