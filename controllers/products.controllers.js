module.exports.getAllProductsStatic = async (req, res) => {
	throw new Error('Testing async errors');
	res.status(200).json({ message: 'Products testing static route' });
};

module.exports.getAllProducts = async (req, res) => {
	res.status(200).json({ message: 'Products testing route' });
};
