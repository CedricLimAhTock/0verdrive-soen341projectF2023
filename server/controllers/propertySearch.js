import Property from "../models/property.js";
import { Op } from "sequelize";

const query = async (req, res) => {
    try {
        let fields = req.body.fields;
        let sort = req.body.sort;

        if (!["price", "listed_date", "year_built", "num_bedrooms", "num_bathrooms"].includes(sort.parameter)) {
            sort.parameter = "price";
        }

        sort.order = sort.order == "asc" ? "asc" : "desc";

        let q = {};

        if (fields.civicAddress) {
            q.civicAddress = { [Op.substring]: fields.civicAddress };
        }
        if (fields.street) {
            q.street = { [Op.substring]: fields.street };
        }
        if (fields.neighbourhood) {
            q.neighbourhood = { [Op.substring]: fields.neighbourhood };
        }
        if (fields.city) {
            q.city = { [Op.substring]: fields.city };
        }
        if (fields.province) {
            q.province = { [Op.substring]: fields.province };
        }
        if (fields.postal_code) {
            q.postal_code = { [Op.substring]: fields.postal_code };
        }
        if (fields.country) {
            q.country = { [Op.substring]: fields.country };
        }

        if (fields.manyTerms) {
            let property_address = fields.manyTerms.trim().replace(",", " ").split(" ").join(" ");

            // q.civic_address = {[Op.or]: terms.map((term) => ({ [Op.substring]: term }))};
            // q.street = { [Op.or]: terms.map((term) => ({ [Op.substring]: term }))}};
            // q.neighbourhood = {[Op.or]: terms.map((term) => ({ [Op.substring]: term }))};
            // q.city = { [Op.or]: terms.map((term) => ({ [Op.substring]: term }))}};
            // q.province = { [Op.or]: terms.map((term) => ({ [Op.substring]: term }))}};
            // q.country = { [Op.or]: terms.map((term) => ({ [Op.substring]: term }))}};
            // q.property_type = {[Op.or]: terms.map((term) => ({ [Op.substring]: term }))};

            q.address = { [Op.like]: "%" + property_address + "%" }; //ilike not supported by mysql
        }

        if (fields.listing_type) {
            q.listing_type = fields.listing_type;
        }

        if (fields.price) {
            q.price = {
                [Op.gte]: (!fields.price.min ? 0 : fields.price.min),
                [Op.lte]: (!fields.price.max ? Number.MAX_SAFE_INTEGER : fields.price.max)
            };
        }
        if (fields.living_area) {
            q.living_area = {
                [Op.gte]: (!fields.living_area.min ? 0 : fields.living_area.min),
                [Op.lte]: (!fields.living_area.max ? Number.MAX_SAFE_INTEGER : fields.living_area.max)
            };
        }
        if (fields.property_area) {
            q.property_area = {
                [Op.gte]: (!fields.property_area.min ? 0 : fields.property_area.min),
                [Op.lte]: (!fields.property_area.max ? Number.MAX_SAFE_INTEGER : fields.property_area.max)
            };
        }
        if (fields.num_bedrooms) {
            q.num_bedrooms = {
                [Op.gte]: (!fields.num_bedrooms.min ? 0 : fields.num_bedrooms.min),
                [Op.lte]: (!fields.num_bedrooms.max ? Number.MAX_SAFE_INTEGER : fields.num_bedrooms.max)
            };
        }
        if (fields.num_bathrooms) {
            q.num_bathrooms = {
                [Op.gte]: (!fields.num_bathrooms.min ? 0 : fields.num_bathrooms.min),
                [Op.lte]: (!fields.num_bathrooms.max ? Number.MAX_SAFE_INTEGER : fields.num_bathrooms.max)
            };
        }
        if (fields.num_floors) {
            q.num_floors = {
                [Op.gte]: (!fields.num_floors.min ? 0 : fields.num_floors.min),
                [Op.lte]: (!fields.num_floors.max ? Number.MAX_SAFE_INTEGER : fields.num_floors.max)
            };
        }
        if (fields.year_built) {
            q.year_built = {
                [Op.gte]: (!fields.year_built.min ? "1000-01-01" : fields.year_built.min),
                [Op.lte]: (!fields.year_built.max ? "9999-12-31" : fields.year_built.max)
            };
        }
        if (fields.listed_date) {
            q.listed_date = {
                [Op.gte]: (!fields.listed_date.min ? "1000-01-01" : fields.listed_date.min),
                [Op.lte]: (!fields.listed_date.max ? "9999-12-31" : fields.listed_date.max)
            };
        }
        if (fields.property_type) {
            q.property_type = fields.property_type;
        }


        let properties = await Property.findAll({
            attributes: [
                "id",
                "active",
                "civic_address",
                "apt_number",
                "street",
                "neighbourhood",
                "city",
                "province",
                "postal_code",
                "country",
                "listing_type",
                "price",
                "living_area",
                "property_area",
                "num_bedrooms",
                "num_bathrooms",
                "num_floors",
                "year_built",
                "listed_date",
                "property_type"
            ],
            where: q,
            order: [[sort.parameter, sort.order]]
        });

        if (!properties) {
            return res.status(404).json({});
        }

        res.status(200).send(properties);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export default { query };