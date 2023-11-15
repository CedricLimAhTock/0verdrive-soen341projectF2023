import express from "express";
import cors from "cors";
import "dotenv/config";
import { config } from "dotenv";

import signUpRoutes from "./routes/auth/signup.js";
import loginRoutes from "./routes/auth/login.js";
import userRoutes from "./routes/user.js";
import roleRoutes from "./routes/role.js";
import userRoleRoutes from "./routes/user_role.js";
import propertyRoutes from "./routes/property.js";
import propertySearchRoutes from "./routes/propertySearch.js";
import brokerSearchRoutes from "./routes/brokerSearch.js";
import visitRoutes from "./routes/visit.js";
import listingRoutes from "./routes/listing.js";

import brokerRoutes from "./routes/broker.js";
import offerRoutes from "./routes/offer.js";
import propertyFavouriteRoutes from "./routes/property_favourite.js";
import messageRoutes from "./routes/message.js"

console.log(config());

const app = express();

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use("/signin", loginRoutes);
app.use("/signup", signUpRoutes);
app.use("/user", userRoutes);
app.use("/user_role", userRoleRoutes);
app.use("/role", roleRoutes);
app.use("/property", propertyRoutes);
app.use("/property/search", propertySearchRoutes);
app.use("/broker/search", brokerSearchRoutes);
app.use("/visit", visitRoutes);
app.use("/listing", listingRoutes);

app.use("/broker", brokerRoutes);
app.use("/offer", offerRoutes);
app.use("/favourite", propertyFavouriteRoutes);
app.use("/message", messageRoutes);


export default app;
