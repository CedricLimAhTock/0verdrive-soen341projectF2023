import { DataTypes } from "sequilize";
import sequelize from "../database/database.js";

const Visit = sequelize.define(
    "Visit",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id',
            },
        },
        client_id:{
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id',
            },
        },
        broker_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id',
            },
        },
        time: {
            type: DataTypes.DATETIME,
        },
        status:{
            type: DataTypes.ENUM('requested', 'booked', 'completed', 'other'),
        }
    },
    {
        tableName: "visit",
    }
);

export default Visit;