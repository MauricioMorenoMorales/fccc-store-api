require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product.model');

const jsonProducts = require('./products.json');

(async () => {
	try {
		await connectDB();
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log('Success populating the database');
	} catch (error) {
		console.log(error);
	}
})();
