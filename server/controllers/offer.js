import User from '../models/user.js';
import User_role from '../models/user_role.js';
import Role from '../models/role.js';
import Offer from '../models/offer.js'; 

const list = async (req, res) => {
    try {
        let offers = await Offer.findAll({
            attributes: ['id', 'active', 'parent_id', 'license_number', 'agency', 'price', 'deed_of_sale_date', 'occupancy_date', 'status']
        });

        if (!offers) {
            return res.status(400).json();
        }
        
        res.status(200).send(offers);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const listById = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            attributes: ['id', 'active', 'parent_id', 'license_number', 'agency', 'price', 'deed_of_sale_date', 'occupancy_date', 'status'],
            where: {id: req.params.id}
        });

        if (!offer) {
            res.status(400).json();
        } else {
            res.status(200).send(offer);
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

        const [offer, created] = await Offer.findOrCreate({
            where: data,
            defaults: {
                active: 1
            }
        });
        if (!created) {
            res.status(400).json({message: "Already exists."});
        } else {
            res.status(200).send(offer);
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
        const offer = await Offer.findOne({where: {id: data.id}});

        if (!offer) {
            return res.status(400).json();
        }

        await Offer.update(data, {where: {id: data.id}});

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

        if (data.id == null || req.body == null) {
            return res.status(400).json();
        }
        const offer = await Offer.findOne({where: {id: data.id}});

        if (!offer) {
            return res.status(400).json();
        }

        await Offer.update(req.body, {where: {id: data.id}});
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
        const offer = await Offer.findOne({
            where: {id: req.params.id}
        });

        if (!offer) {
            return res.status(400).json();
        }

        offer.destroy();
        
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

export default {list, listById, create, update, updateById, destroy};