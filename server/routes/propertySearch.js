import express from 'express';
import propertySearchController from '../controllers/propertySearch.js';

const router = express.Router();

// search for properties
// example payload
// parameters can be omitted
// strings are matched exactly
// {
//     "fields": {
//         "civicAddress": "4366",
//         "aptNumber": "681",
//         "street": "Mcguire",
//         "neighbourhood": "Manning",
//         "city": "Montreal",
//         "province": "Quebec",
//         "postalCode": "I4S 8J8",
//         "country": "Canada",
//         "listingType": "sale",
//         "price": {"min": 99900000},
//         "livingArea": {"min": 0, "max": 9999}
//         "propertyArea": {"min": 0, "max":1000},
//         "numOfBedrooms": {"min": 0, "max":1000},
//         "numOfBathrooms": {"min": 0, "max":1000},
//         "numOfFloors": {"min": 0, "max":1000},
//         "yearBuilt": {"min": "1970-01-01", "max":},
//         "listedDate": {"min": "1970-01-01", "max":"9999-01-01"},
//         "propertyType": "other"
//     },
//     "sort": {
//         "parameter": "price",
//         "order": "asc"
//     }
// }
router.post('/', propertySearchController.query);


export default router;