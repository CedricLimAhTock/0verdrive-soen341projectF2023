import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js"
import Property from "./property.js";
import User_role from "./user_role.js";

const Listing = sequelize.define(
    "listings",
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
        parent_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id'
            }
        },
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id'
            },
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "listings",
    }
);

User.hasMany(Listing, { foreignKey: 'parent_id' });
Property.hasOne(Listing, { foreignKey: 'property_id' });
Listing.belongsTo(Property);
Listing.belongsTo(User);

//Property.belongsToMany(User, {through: Listing})
export default Listing;