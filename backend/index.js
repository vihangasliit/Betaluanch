import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"

import dotenv from 'dotenv'
dotenv.config()

import employeeRoute from "./routes/employeeRoute.js"

mongoose.set('strictQuery', false);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(employeeRoute);


const CONNECTION_URL = process.env.MONGODB_URL || "mongodb+srv://admin:admin@mern.ewbkz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const server = mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log("Server listening on port: " + PORT))
    )
    .catch((err) => console.log(err));

export default server;