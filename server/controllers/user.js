import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';


const list = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: ['id', 'active', 'address', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone']
        });

        if (!users) {
            return res.status(404).json();
        }
        
        res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: ['id', 'active', 'address', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
            where: {id: req.params.id}
        });

        if (!user) {
            return res.status(404).json();
        } else {
            res.status(200).send(user);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['id', 'active', 'address', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
            where: {username: req.params.username}
        });

        if (!user) {
            return res.status(404).json();
        } else {
            res.status(200).send(user);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByRole = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'active', 'address', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
            include: [
                {
                    model: User_role,
                    required: true,
                    attributes: [],
                    include:
                    {
                        model: Role,
                        attributes: [],
                        where: {
                            type: req.params.type
                        }
                    }
                }
            ]
        });

        if (!users) {
            return res.status(404).json();
        } else {
            res.status(200).send(users);
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
        let data = req.body;

        if (!data.username || !data.password) {
            return res.status(400).json({ message: "username and password cannot be null." });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        
        const [user, created] = await User.findOrCreate({
            attributes: ['id'],
            where: {
                username: data.username
            },
            defaults: {
                active: 1,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                email: data.email,
                phone: data.phone
            }
        });
        if (!created) {
            return res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(user);
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
        let user_id = req.body.id;

        if(user_id == null || !data.username){
            return res.status(400).json({
                message: 'missing id or username'
            });
        }

        // check user exits
        const user = await User.findOne({where: {id: user_id}});
        if (!user) {
            return res.status(404).json({message: 'user not found.'});
        }

        // check username unique
        const other = await User.findOne({
            where: {
                [Op.not]: { id: user_id },
                username: data.username
            }
        });
        if (other) {
            return res.status(400).json({message: 'username not unique.'});
        }


        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        delete data.id;
        const nu = await User.update(data, {where: {id: user_id}});

        res.status(200).send(nu);

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
        let user_id = req.params.id;

        if (user_id == null || !data.username) {
            return res.status(400).json({
                message: 'missing id or username'
            });
        }

        // check user exits
        const user = await User.findOne({where: {id: user_id}});
        if (!user) {
            return res.status(404).json({message: 'user not found.'});
        }

        // check username unique
        const other = await User.findOne({
            where: {
                [Op.not]: { id: user_id },
                username: data.username
            }
        });
        if (other) {
            return res.status(400).json({message: 'username not unique.'});
        }


        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        delete data.id;
        const nu = await User.update(data, {where: {id: user_id}});

        res.status(200).send(nu);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const destroy = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['id'],
            where: {id: req.params.id}
        });

        if (!user) {
            return res.status(404).json();
        }

        user.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByUsername, listByRole, create, update, updateById, destroy};