import express from 'express';
import propertySearchController from '../controllers/propertySearch.js';

const router = express.Router();

// search for properties
// example payload
// parameters can be omitted
// strings are matched exactly
// {
//     "fields": {
//         "civic_address": "4366",
//         "apt_number": "681",
//         "street": "Mcguire",
//         "neighbourhood": "Manning",
//         "city": "Montreal",
//         "province": "Quebec",
//         "postal_code": "I4S 8J8",
//         "country": "Canada",
//         "listing_type": "sale",
//         "price": {"min": 99900000},
//         "living_area": {"min": 0, "max": 9999}
//         "property_area": {"min": 0, "max":1000},
//         "num_bedrooms": {"min": 0, "max":1000},
//         "num_bathrooms": {"min": 0, "max":1000},
//         "num_floors": {"min": 0, "max":1000},
//         "year_built": {"min": "1970-01-01", "max":},
//         "listed_date": {"min": "1970-01-01", "max":"9999-01-01"},
//         "propertyType": "other"
//     },
//     "sort": {
//         "parameter": "price",
//         "order": "asc"
//     }
// }
router.post('/', propertySearchController.query);


export default router;