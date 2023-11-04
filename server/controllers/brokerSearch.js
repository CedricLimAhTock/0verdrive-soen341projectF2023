import Broker from '../models/broker.js';
import User from '../models/user.js';
import { Op } from 'sequelize';


const query = async (req, res) => {
    try {
        let fields = req.body.fields;
        let sort = req.body.sort;
        
        let q = {};
        let u = {};
        if (fields.user_id) {
            q.user_id = fields.user_id;
        }
        if (fields.license_number) {
            q.license_number = fields.license_number;
        }
        if (fields.agency) {
            q.agency = {[Op.substring]: fields.agency};
        }
        if (fields.email) {
            q.email = {[Op.substring]: fields.email};
        }
        if (fields.phone) {
            q.phone = fields.phone;
        }
        if (fields.firstname) {
            u.firstname = {[Op.substring]: fields.firstname};
        }
        if (fields.lastname) {
            u.lastname = {[Op.substring]: fields.lastname};
        }
        
        let brokers = await Broker.findAll({
            attributes: ["id", "active", "user_id", "license_number", "agency", "email", "phone"],
            where: q,
            include: {
                model: User,
                attributes: ["firstname", "lastname"],
                required: true,
                where: u
            }
        })

        if (!brokers) {
            return res.status(400).json({});
        }
        
        res.status(200).send(brokers);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}


export default {query};