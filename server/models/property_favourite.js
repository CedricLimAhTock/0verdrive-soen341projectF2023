import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Property from "./property.js";
import User from "./user.js";

const Property_favourite = sequelize.define(
    "property_favourite",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        property_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: Property,
                key: 'id',
            },
        },
        user_id:{
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "property_favourite",
        indexes: [
            {
                unique: true,
                fields: ['property_id', 'user_id']
            }
        ]
    }
);


User.hasMany(Property_favourite, { foreignKey: 'user_id' });
Property.hasMany(Property_favourite, { foreignKey: 'property_id' });
Property_favourite.belongsTo(Property);
Property_favourite.belongsTo(User);

export default Property_favourite;