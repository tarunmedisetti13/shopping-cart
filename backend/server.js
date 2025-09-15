// server.js
const express = require('express');
const userRouter = require('./router/UserRouter');
const productRouter = require('./router/productRouter');
const connectDB = require('./Connections/dbconnect')
const cors = require('cors');
const app = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

(async () => {
    try {
        await connectDB();
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}`);
        });
    } catch (error) {
        console.error(error);
    }
})();
