import Property from '../models/property.js';
import { Op } from 'sequelize';


const query = async (req, res) => {
    try {
        let fields = req.body.fields;
        let sort = req.body.sort;

        if (!sort.parameter) {
            sort.parameter = "price";
        }
        if (!sort.order) {
            sort.order = "desc";
        }
        
        let q = {};
        if (fields.civicAddress) {
            q.civicAddress = fields.civicAddress;
        }
        if (fields.street) {
            q.street = fields.street;
        }
        if (fields.neighbourhood) {
            q.neighbourhood = fields.neighbourhood;
        }
        if (fields.city) {
            q.city = fields.city;
        }
        if (fields.province) {
            q.province = fields.province;
        }
        if (fields.postalCode) {
            q.postalCode = fields.postalCode;
        }
        if (fields.country) {
            q.country = fields.country;
        }
        if (fields.price) {
            q.price = {
                [Op.gte]: (!fields.price.min ? 0 : fields.price.min),
                [Op.lte]: (!fields.price.max ? Number.MAX_SAFE_INTEGER : fields.price.max)
            };
        }
        if (fields.livingArea) {
            q.livingArea = {
                [Op.gte]: (!fields.livingArea.min ? 0 : fields.livingArea.min),
                [Op.lte]: (!fields.livingArea.max ? Number.MAX_SAFE_INTEGER : fields.livingArea.max)
            };
        }
        if (fields.propertyArea) {
            q.propertyArea = {
                [Op.gte]: (!fields.propertyArea.min ? 0 : fields.propertyArea.min),
                [Op.lte]: (!fields.propertyArea.max ? Number.MAX_SAFE_INTEGER : fields.propertyArea.max)
            };
        }
        if (fields.numOfBedrooms) {
            q.numOfBedrooms = {
                [Op.gte]: (!fields.numOfBedrooms.min ? 0 : fields.numOfBedrooms.min),
                [Op.lte]: (!fields.numOfBedrooms.max ? Number.MAX_SAFE_INTEGER : fields.numOfBedrooms.max)
            };
        }
        if (fields.numOfFloors) {
            q.numOfFloors = {
                [Op.gte]: (!fields.numOfFloors.min ? 0 : fields.numOfFloors.min),
                [Op.lte]: (!fields.numOfFloors.max ? Number.MAX_SAFE_INTEGER : fields.numOfFloors.max)
            };
        }
        if (fields.yearBuilt) {
            q.yearBuilt = {
                [Op.gte]: (!fields.yearBuilt.min ? "1000-01-01" : fields.yearBuilt.min),
                [Op.lte]: (!fields.yearBuilt.max ? "9999-12-31" : fields.yearBuilt.max)
            };
        }
        if (fields.listedDate) {
            q.listedDate = {
                [Op.gte]: (!fields.listedDate.min ? "1000-01-01" : fields.listedDate.min),
                [Op.lte]: (!fields.listedDate.max ? "9999-12-31" : fields.listedDate.max)
            };
        }
        if (fields.propertyType) {
            q.propertyType = fields.propertyType;
        }
        

        let properties = await Property.findAll({
            attributes: ['id',
            'active',
            'civicAddress',
            'aptNumber',
            'street',
            'neighbourhood',
            'city',
            'province',
            'postalCode',
            'country',
            'listingType',
            'price',
            'livingArea',
            'propertyArea',
            'numOfBedrooms',
            'numOfBathrooms',
            'numOfFloors',
            'yearBuilt',
            'listedDate'
            ],
            where:  q,
            order: [
                [sort.parameter, sort.order]
            ],
        })

        if (!properties) {
            return res.status(400).json({});
        }
        
        res.status(200).send(properties);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


export default {query};