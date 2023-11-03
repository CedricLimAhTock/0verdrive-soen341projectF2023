import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';
import Broker from '../models/broker.js'; 
import Property from '../models/property.js';
import Listing from '../models/listing.js';

const list = async (req, res) => {
    try {
        let brokers = await Broker.findAll({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            include: User
        });

        if (!brokers) {
            return res.status(400).json();
        }
        
        res.status(200).send(brokers);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let broker = await Broker.findOne({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            include: User,
            where: {id: req.params.id}
        });

        if (!broker) {
            res.status(400).json();
        } else {
            res.status(200).send(broker);
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
        let broker = await Broker.findOne({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            include: {
                model: User,
                where: { id: req.params.id },
                include: {
                    model: User_role,
                    required: true, // generate INNER JOIN
                    attributes: [], // don't return any columns
                    //right: true,  // does a right join
                    include: {
                        model: Role,
                        required: true, // generate INNER JOIN
                        attributes: [], // don't return any columns
                        //right: true,  // does a right join
                        where: {type: 'broker'}
                    }
                }
            }
        });

        if (!broker) {
            res.status(400).json();
        } else {
            res.status(200).send(broker);
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
        let broker = await Broker.findOne({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            include: {
                model: User,
                where: { username: req.params.username },
                include: {
                    model: User_role,
                    required: true, // generate INNER JOIN
                    attributes: [], // don't return any columns
                    //right: true,  // does a right join
                    include: {
                        model: Role,
                        required: true, // generate INNER JOIN
                        attributes: [], // don't return any columns
                        //right: true,  // does a right join
                        where: {type: 'broker'}
                    }
                }
            }
        });

        if (!broker) {
            res.status(400).json();
        } else {
            res.status(200).send(broker);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listByPropertyId = async (req, res) => {
    try {
        let broker = await Broker.findOne({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            include: [
                {
                model: Listing,
                required: true,
                attributes: [],
                where: { property_id: req.params.id }
            },
            {
                model: User,
                required: true
            }]
        });

        if (!broker) {
            res.status(400).json();
        } else {
            res.status(200).send(broker);
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

        if (!data.user_id) {
            return res.status(400).json({ message: "user_id cannot be null." });
        }        

        const temp = await User.findOne({
            include: {
                model: User_role,
                required: true, // do INNER JOIN
                attributes: [], // don't return any columns
                //right: true,    //does a right join
                include:
                {
                    model: Role,
                    required: true,
                    attributes: [],
                    where: {type: 'broker'}
                }
            },
            where: {id: data.user_id }
        });

        if (!temp) {
            return res.status(400).json({ message: "user_id does not belong to any broker." });
        }

        const [broker, created] = await Broker.findOrCreate({
            attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
            where: data,
            defaults: {
                active: 1
            }
        });

        if (!created) {
            return res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(broker);
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

        delete data.user_id;

        const broker = await Broker.findOne({where: {id: data.id}});

        if (!broker) {
            return res.status(400).json({ message: "broker does nto exist." });
        }   

        await Broker.update(data, {where: {id: data.id}});

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
        delete data.user_id; 

        const broker = await Broker.findOne({where: {id: req.params.id}});

        if (!broker) {
            return res.status(400).json({ message: "broker does nto exist." });
        }

        
        await Broker.update(data, {where: {id: req.params.id}});
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
        const broker = await Broker.findOne({
            where: {id: req.params.id}
        });

        if (!broker) {
            return res.status(400).json();
        }

        broker.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, listByUserId, listByUsername, listByPropertyId, create, update, updateById, destroy};