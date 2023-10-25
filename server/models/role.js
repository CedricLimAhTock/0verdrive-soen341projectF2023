import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Role = sequelize.define(
    "Role",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        type: {
            type: DataTypes.ENUM('member', 'broker', 'admin')
        }
    },
    {
        freezeTableName: true,
        tableName: "role",
    }
);

export default Role;