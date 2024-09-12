import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import Products_route from './routes/product_route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/products", Products_route);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});