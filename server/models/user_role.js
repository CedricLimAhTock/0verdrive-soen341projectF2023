import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.js"
import Role from "./role.js"

const User_role = sequelize.define(
    "User_role",
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
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id',
            },
        },
        role_id: {
            type: DataTypes.BIGINT,
            references: {
                model: Role,
                key: 'id',
            }
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "user_role",
    }
);

User.hasMany(User_role, { foreignKey: 'user_id' });
Role.hasMany(User_role, { foreignKey: 'role_id' });
Role.belongsToMany(User, { through: User_role });
User_role.belongsTo(Role);
User_role.belongsTo(User);


export default User_role;