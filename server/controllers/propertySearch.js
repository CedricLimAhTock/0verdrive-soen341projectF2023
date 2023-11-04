import Property from "../models/property.js";
import { Op } from "sequelize";

const query = async (req, res) => {
  try {
    let fields = req.body.fields;
    let sort = req.body.sort;

    console.log(fields);

    if (
      ![
        "price",
        "listed_date",
        "year_built",
        "num_bedrooms",
        "num_bathrooms",
      ].includes(sort.parameter)
    ) {
      sort.parameter = "price";
    }

    sort.order = sort.order == "asc" ? "asc" : "desc";

    let q = [];
    // if (fields.civicAddress) {
    //   q.civicAddress = { [Op.substring]: fields.civicAddress };
    // }
    // if (fields.street) {
    //   q.street = { [Op.substring]: fields.street };
    // }
    // if (fields.neighbourhood) {
    //   q.neighbourhood = { [Op.substring]: fields.neighbourhood };
    // }
    // if (fields.city) {
    //   q.city = { [Op.substring]: fields.city };
    // }
    // if (fields.province) {
    //   q.province = { [Op.substring]: fields.province };
    // }
    // if (fields.postal_code) {
    //   q.postal_code = fields.postal_code;
    // }
    // if (fields.country) {
    //   q.country = { [Op.substring]: fields.country };
    // }

    if (fields.manyTerms) {
      let terms = fields.manyTerms.split(" ");

      q.push({
        civic_address: {
          [Op.or]: terms.map((term) => ({ [Op.substring]: term })),
        },
      });
      q.push({
        street: { [Op.or]: terms.map((term) => ({ [Op.substring]: term })) },
      });
      q.push({
        neighbourhood: {
          [Op.or]: terms.map((term) => ({ [Op.substring]: term })),
        },
      });
      q.push({
        city: { [Op.or]: terms.map((term) => ({ [Op.substring]: term })) },
      });
      q.push({
        province: { [Op.or]: terms.map((term) => ({ [Op.substring]: term })) },
      });
      q.push({
        country: { [Op.or]: terms.map((term) => ({ [Op.substring]: term })) },
      });
      q.push({
        property_type: {
          [Op.or]: terms.map((term) => ({ [Op.substring]: term })),
        },
      });
    }

    if (fields.price && (fields.price.min || fields.price.max)) {
      q.push({
        price: {
          [Op.gte]: !fields.price.min ? 0 : fields.price.min,
          [Op.lte]: !fields.price.max
            ? Number.MAX_SAFE_INTEGER
            : fields.price.max,
        },
      });
    }
    if (
      fields.living_area &&
      (fields.living_area.min || fields.living_area.max)
    ) {
      q.push({
        living_area: {
          [Op.gte]: !fields.living_area.min ? 0 : fields.living_area.min,
          [Op.lte]: !fields.living_area.max
            ? Number.MAX_SAFE_INTEGER
            : fields.living_area.max,
        },
      });
    }
    if (
      fields.property_area &&
      (fields.property_area.min || fields.property_area.max)
    ) {
      q.push({
        property_area: {
          [Op.gte]: !fields.property_area.min ? 0 : fields.property_area.min,
          [Op.lte]: !fields.property_area.max
            ? Number.MAX_SAFE_INTEGER
            : fields.property_area.max,
        },
      });
    }
    if (
      fields.num_bedrooms &&
      (fields.num_bedrooms.min || fields.num_bedrooms.max)
    ) {
      q.push({
        num_bedrooms: {
          [Op.gte]: !fields.num_bedrooms.min ? 0 : fields.num_bedrooms.min,
          [Op.lte]: !fields.num_bedrooms.max
            ? Number.MAX_SAFE_INTEGER
            : fields.num_bedrooms.max,
        },
      });
    }
    if (
      fields.num_bathrooms &&
      (fields.num_bathrooms.min || fields.num_bathrooms.max)
    ) {
      q.push({
        num_bathrooms: {
          [Op.gte]: !fields.num_bathrooms.min ? 0 : fields.num_bathrooms.min,
          [Op.lte]: !fields.num_bathrooms.max
            ? Number.MAX_SAFE_INTEGER
            : fields.num_bathrooms.max,
        },
      });
    }
    if (fields.num_floors && (fields.num_floors.min || fields.num_floors.max)) {
      q.push({
        num_floors: {
          [Op.gte]: !fields.num_floors.min ? 0 : fields.num_floors.min,
          [Op.lte]: !fields.num_floors.max
            ? Number.MAX_SAFE_INTEGER
            : fields.num_floors.max,
        },
      });
    }
    if (fields.year_built && (fields.year_built.min || fields.year_built.max)) {
      q.push({
        year_built: {
          [Op.gte]: !fields.year_built.min
            ? "1000-01-01"
            : fields.year_built.min,
          [Op.lte]: !fields.year_built.max
            ? "9999-12-31"
            : fields.year_built.max,
        },
      });
    }
    if (
      fields.listed_date &&
      (fields.listed_date.min || fields.listed_date.max)
    ) {
      q.push({
        listed_date: {
          [Op.gte]: !fields.listed_date.min
            ? "1000-01-01"
            : fields.listed_date.min,
          [Op.lte]: !fields.listed_date.max
            ? "9999-12-31"
            : fields.listed_date.max,
        },
      });
    }

    if (fields.postal_code) {
      q.push({ postal_code: fields.postal_code }); //fields.postal_code;
    }

    console.log(q);
    console.log(q.civicAddress);

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
        "property_type",
      ],
      where: { [Op.or]: q },
      order: [[sort.parameter, sort.order]],
    });

    if (!properties) {
      return res.status(400).json({});
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
