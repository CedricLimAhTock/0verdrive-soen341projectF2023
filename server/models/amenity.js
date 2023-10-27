import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Amenity = sequelize.define(
    "amenity",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        name: {
            type: DataTypes.ENUM('elevator', 'gym', 'pool', 'laundry room', 'internet', 'water', 'hydro', 'public transportation', 'park', 'accessibility')
        }
    },
    {
        freezeTableName: true,
        tableName: "amenity",
    }
);


export default Amenity;