import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js"
import Property from "./property.js";

const Listing = sequelize.define(
    "listing",
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
        property_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id'
            },
        },
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id'
            }
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
        tableName: "listing",
    }
);

User.hasMany(Listing, { foreignKey: 'user_id' });
Property.hasMany(Listing, { foreignKey: 'property_id' });
Property.belongsToMany(User, { through: Listing });
Listing.belongsTo(Property);
Listing.belongsTo(User);


export default Listing;