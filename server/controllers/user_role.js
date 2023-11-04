import User_role from '../models/user_role.js';


const list = async (req, res) => {
    try {
        let user_roles = await User_role.findAll({ attributes: ['id', 'active', 'user_id', 'role_id']});

        if (!user_roles) {
            return res.status(400).json({});
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
            return res.status(400).json({});
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
            return res.status(400).json();
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
        
        const [user_role, created] = await User_role.findOrCreate({
            attributes: ['id'],
            where: {
                user_id: data.user_id,
                role_id: data.role_id
            },
            defaults: {
                active: 1
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
        if(req.body.id == null){
            return res.status(400).json();
        }
        const user_role = await User_role.findOne({where: {id: req.body.id}});

        if (!user_role) {
            return res.status(400).json();
        }

        delete data.user_id;
        await User_role.update(req.body, {where: {id: req.body.id}});
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


const updateById = async (req, res) => {
    try {
        if(req.body == null){
            return res.status(400).json();
        }
        const user_role = await User_role.findOne({where: {id: req.params.id}});

        if (!user_role) {
            return res.status(400).json();
        }

        delete data.user_id;
        await User_role.update(req.body, {where: {id: req.params.id}});

        res.status(200).json();

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
            return res.status(400).json();
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
