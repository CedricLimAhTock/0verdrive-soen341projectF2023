import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';


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

const listByRole = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: User_role,
                    required: true, // do not generate INNER JOIN
                    attributes: [], // don't return any columns
                    //right: true,    //does a right join
                    include:
                    {
                        model: Role,
                        attributes: [],
                        where: {
                            type: req.params.type
                        },
                        //right: true
                    }
                }
            ]
        });

        if (!users) {
            res.status(400).json();
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
        const data = req.body;
        
        let user = await User.findOne({
            where: {username: req.body.username}
        });
        if (user) {
            res.status(400).json({ message: "Already exists" });
        }

        let nuser = await User.create(data);
        if (!nuser) {
            res.status(400).json();
        } else {
            res.status(200).send(nuser);
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

export default {list, listById, listByUsername, listByRole, create, update, updateById, destroy};