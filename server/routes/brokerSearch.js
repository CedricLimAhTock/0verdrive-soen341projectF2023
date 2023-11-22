import express from "express";
import brokerSearchController from "../controllers/brokerSearch.js";

const router = express.Router();

// example fields for search
// {
//     "fields":{
//         // "active": true,
//         // "user_id": 10,
//         // "license_number": "f12fcd94-6968-469e-9dbc-3ed68510414e"
//         // "agency": ""
//         // "email": "lo"
//         // "phone": "666"
//         // "firstname": "i"
//         // "lastname":"mi"
//     }
// }
router.post("/", brokerSearchController.query);


export default router;