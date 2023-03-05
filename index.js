const express = require('express')
const cors = require('cors')
const products = require('./products');
const register = require('./routes/register')
const login = require('./routes/login')
const productsRoutes = require('./routes/products')
// const path = require('path')

//accessing dotenv file
require("dotenv").config()

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Running ${mongoose.connection.host}`);
    } catch (error) {
        console.log('Database Connection Error');
    }
};

//Rest App
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/products',productsRoutes)


// Routes
app.get('/products',(req,res)=>{
    res.send(products);
})


//static files
// app.use(express.static(path.join(__dirname, './frontend/build')));
// app.get('*' , function(req,res){
//     res.sendFile(path.join(__dirname, './frontend/build/index.html'));
// });

const PORT = process.env.PORT
//Listen the App
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port:", PORT)
    })
})