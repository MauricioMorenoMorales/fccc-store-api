const Product = require('../models/product.model');

module.exports.getAllProductsStatic = async (req, res) => {
	const search = 'u';
	const products = await Product.find({}).select('name price').limit(10);
	res.status(200).json({
		products,
		nbHits: products.length,
	});
};

module.exports.getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query;
	const queryObject = {};
	//Verifies te query params
	if (featured) {
		queryObject.featured = featured === 'true';
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	let result = Product.find(queryObject);
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit)
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};
