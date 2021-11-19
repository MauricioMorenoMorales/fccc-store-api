const Product = require('../models/product.model');

module.exports.getAllProducts = async (req, res) => {
	const products = await Product.find(req.query);
	res.status(200).json({ products, nbHits: products.length });
};

module.exports.getAllProductsStatic = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json({
		products,
		nbHits: products.length,
	});
};
