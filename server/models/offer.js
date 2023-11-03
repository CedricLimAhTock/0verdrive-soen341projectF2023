import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js";
import Property from "./property.js";

const Offer = sequelize.define(
    "offer",
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
        parent_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id'
            }
        },
        license_number: {
            type: DataTypes.BIGINT,
            references: {
                model: Property,
                key: 'id'
            },
        },
        agency: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id'
            }
        },
        price: {
            type: DataTypes.STRING
        },
        deed_of_sale_date: {
            type: DataTypes.DATE
        },
        occupancy_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('wait', 'acknowledge', 'review', 'accept', 'deny', 'other')
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "offer",
    }
);

User.hasMany(Offer);
Offer.belongsTo(User, { foreignKey: 'parent_id' });
Offer.belongsTo(User, { foreignKey: 'user_id' });

export default Offer;