const express = require('express')

const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const rout = require('./Routs/Product')
const cart = require('./Routs/Cart');
const order = require('./Routs/Orders');
const authRoutes = require('./Routs/Auth'); 

dotenv.config();

const app = express();
const port = 3000

app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://2006dhruvi:Dhruvi2006@clusterone.orzlmh2.mongodb.net/product'; // Match this with Compass

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/products' , rout);
app.use('/api/cart' , cart);
app.use('/api/orders' , order);

app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 








