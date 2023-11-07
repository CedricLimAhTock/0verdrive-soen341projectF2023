import sequelize from 'sequelize';
import User_role from '../models/user_role.js';
import User from '../models/user.js';
import Role from '../models/role.js';

const list = async (req, res) => {
    try {
        let user_roles = await User_role.findAll({ attributes: ['id', 'active', 'user_id', 'role_id']});

        if (!user_roles) {
            return res.status(404).json({});
        } else {
            res.status(200).send(user_roles);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let user_role = await User_role.findOne({
            attributes: ['id', 'active', 'user_id', 'role_id'],
            where: {id: req.params.id}
        });

        if (!user_role) {
            return res.status(404).json({});
        } else {
            res.status(200).send(user_role);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByUserId = async (req, res) => {
    try {
        const user_role = await User_role.findOne({
            attributes: ['id', 'active', 'user_id', 'role_id'],
            where: {user_id: req.params.user_id}
        });

        if (!user_role) {
            return res.status(404).json();
        } else {
            res.status(200).send(user_role);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        
        // prevent foreign key error for out of bound ids
        const user = await User.findOne({ attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']] });

        if (data.user_id > user.id) {
            return res.status(400).json({message: "invalid user_id."});
        }

        const role = await Role.findOne({ attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']]});

        if (data.role_id > role.id) {
            return res.status(400).json({message: "invalid role_id."});
        }

        // create only if user doesn't exist
        const [user_role, created] = await User_role.findOrCreate({
            attributes: ['id'],
            where: {
                user_id: data.user_id
            },
            defaults: {
                active: 1,
                role_id: data.role_id
            }
        });
        if (!created) {
            return res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(user_role);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const update = async (req, res) => {
    try {

        let data = req.body;
        let ur_id = req.body.id;

        if(ur_id == null){
            return res.status(400).json({message: "missing id."});
        }
        let user_role = await User_role.findOne({where: {id: ur_id}});

        if (!user_role) {
            return res.status(400).json({message: "invalid role id."});
        }

        delete data.user_id;
        delete data.id;

        user_role = await User_role.update(data, {where: {id: ur_id}});
        res.status(200).send(user_role);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const updateById = async (req, res) => {
    try {

        let data = req.body;
        let ur_id = req.params.id;

        if(ur_id == null){
            return res.status(400).json({message: "missing id."});
        }
        let user_role = await User_role.findOne({where: {id: ur_id}});

        if (!user_role) {
            return res.status(400).json({message: "invalid role id."});
        }

        delete data.user_id;
        delete data.id;

        user_role = await User_role.update(data, {where: {id: ur_id}});
        res.status(200).send(user_role);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const destroy = async (req, res) => {
    try {
        const user_role = await User_role.findOne({
            attributes: ['id'],
            where: {
                id: req.params.id
            }
        });

        if (!user_role) {
            return res.status(404).json();
        }

        user_role.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByUserId, create, update, updateById, destroy};
