import { Op } from "sequelize";
import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';
import Broker from '../models/broker.js'; 
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
            return res.status(400).json();
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
                        required: true,
                        attributes: [], 
                        //right: true,
                        where: {type: 'broker'}
                    }
                }
            }
        });

        if (!broker) {
            return res.status(400).json();
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
                        required: true,
                        attributes: [],
                        //right: true,
                        where: {type: 'broker'}
                    }
                }
            }
        });

        if (!broker) {
            return res.status(400).json();
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
                }
            ]
        });

        if (!broker) {
            return res.status(400).json();
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
        const data = req.body;

        if (!data.user_id) {
            return res.status(400).json({ message: "user_id cannot be null." });
        }        

        // check if user id has role broker
        const temp = await User.findOne({
            include: {
                model: User_role,
                required: true,
                attributes: [],
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

        let broker = await Broker.findOne({where: { user_id: data.user_id }});

        if (broker) {
            return res.status(400).json({ message: "Already exists." });
        } else {
            console.log(data);
            broker = await Broker.create({
                active: data.active,
                user_id: data.user_id,
                license_number: data.license_number,
                agency: data.agency,
                email: data.email,
                phone: data.phone 
            });
            
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
        let broker_id = req.body.id;

        if(data.id == null){
            return res.status(400).json();
        }

        // don't allow updating user id
        delete data.user_id;
        delete data.id;

        let broker = await Broker.findOne({where: {id: broker_id}});

        if (!broker) {
            return res.status(400).json({ message: "broker does not exist." });
        }

        broker = await Broker.findOne({
            where: {
                [Op.or]: [
                    { license_number: data.license_number },
                    { email: data.email },
                    { phone: data.phone }
                ],
                [Op.not]: {id: broker_id }
            }
        });

        if (broker) {
            return res.status(400).json({ message: "data not unique." });
        }

        broker = await Broker.update(data, {where: { id: broker_id }});

        res.status(200).send(broker);

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
        let broker_id = req.params.id;

        if (broker_id == null || data == null) {
            return res.status(400).json();
        }

        // don't allow updating user id
        delete data.user_id;
        delete data.id;

        let broker = await Broker.findOne({where: {id: broker_id}});

        if (!broker) {
            return res.status(400).json({ message: "broker does not exist." });
        }

        broker = await Broker.findOne({
            where: {
                [Op.or]: [
                    { license_number: data.license_number },
                    { email: data.email },
                    { phone: data.phone }
                ],
                [Op.not]: {id: broker_id }
            }
        });

        if (broker) {
            return res.status(400).json({ message: "data not unique." });
        }

        broker = await Broker.update(data, {where: { id: broker_id }});

        res.status(200).send(broker);


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