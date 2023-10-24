import User from '../models/user.js';
import User_role from '../models/user_role.js';


const list = async (req, res) => {
    try {
        let users = await User.findAll();

        if (!users) {
            return res.status(400).json();
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
            where: {id: req.params.id}
        });

        if (!user) {
            res.status(400).json();
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
            where: {username: req.params.username}
        });

        if (!user) {
            res.status(400).json();
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

const create = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOrCreate({ where: { username: data.username} }, data);
        if (!user) {
            res.status(400).json();
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
        if(req.body.id == null){
            return res.status(400).json();
        }
        const user = await User.findOne({where: {id: req.body.id}});

        if (!user) {
            return res.status(400).json();
        }

        await User.update(req.body, {where: {id: req.body.id}});

        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


//TODO hash password?
const updateById = async (req, res) => {
    try {

        if (req.params.id == null || req.body == null) {
            return res.status(400).json();
        }
        const user = await User.findOne({where: {id: req.params.id}});

        if (!user) {
            return res.status(400).json();
        }

        await User.update(req.body, {where: {id: req.params.id}});

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
        const user = await User.findOne({
            where: {id: req.params.id}
        });

        if (!user) {
            return res.status(400).json();
        }

        user.destroy();
        
        const result = await User_role.destroy({
            where: {user_id: req.params.id}
        })
 
        res.status(200).json(null);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByUsername, create, update, updateById, destroy};