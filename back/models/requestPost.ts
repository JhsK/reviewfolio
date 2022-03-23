import { DataTypes, Model } from "sequelize";
import { dbType } from ".";
import sequelize from "./sequelize";

enum RequestStatus {
    'recurit',
    'ing,'
}

class RequestPost extends Model {
    public readonly id!: number;
    public title!: string;
    public maxReviewer?: number;
    public body!: string;
    public file!: string;
    public status?: RequestStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RequestPost.init({
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
        values: ['recurit', 'ing'],
        defaultValue: 'recurit',
    },
}, {
    sequelize,
    modelName: 'RequestPost',
    tableName: 'requestPost',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {

}

export default RequestPost;