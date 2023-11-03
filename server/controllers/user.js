import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';


const list = async (req, res) => {
    try {
        let users = await User.findAll({ attributes: ['id', 'active', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'] });

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
            attributes: ['id', 'active', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
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
            attributes: ['id', 'active', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
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
            attributes: ['id', 'active', 'firstname', 'lastname', 'address', 'username', 'password', 'email', 'phone'],
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
        let data = req.body;

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        
        const [user, created] = await User.findOrCreate({
            where: {
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                email: data.email,
                phone: data.phone
            },
            defaults: {
                active: 1
            }
        });
        if (!created) {
            res.status(400).json({message: "Already exists."});
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

        if(data.id == null){
            return res.status(400).json();
        }
        const user = await User.findOne({where: {id: data.id}});

        if (!user) {
            return res.status(400).json();
        }
        
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        await User.update(data, {where: {id: data.id}});

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
        let data = req.body;

        if (req.params.id == null || data == null) {
            return res.status(400).json();
        }
        const user = await User.findOne({where: {id: req.params.id}});

        if (!user) {
            return res.status(400).json();
        }

        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        await User.update(data, {where: {id: req.params.id}});
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
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByUsername, listByRole, create, update, updateById, destroy};