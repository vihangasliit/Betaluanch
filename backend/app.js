import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import employeeRoute from "./routes/employeeRoute.js";

dotenv.config();

mongoose.set('strictQuery', false);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(employeeRoute);

const CONNECTION_URL = process.env.MONGODB_URL || "mongodb+srv://admin:admin@mern.ewbkz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error.message));

export default app;
