import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js";

const Message = sequelize.define(
    "message",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        parent_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        message: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "message"
    }
);

User.hasMany(Message, { foreignKey: 'user_id' });
User.hasMany(Message, { foreignKey: 'parent_id' });
Message.belongsTo(User);

export default Message;