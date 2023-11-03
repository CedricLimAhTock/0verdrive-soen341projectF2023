import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js";

const Broker = sequelize.define(
    "broker",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: 'id'
            }
        },
        license_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        agency: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "broker"
    }
);

User.hasMany(Broker, { foreignKey: 'user_id' });
Broker.belongsTo(User);

export default Broker;