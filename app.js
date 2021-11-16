require('dotenv').config();
require('express-async-errors');
// async errors
const express = require('express');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const app = express();

const connectDb = require('./db/connect.js');

const productsRouter = require('./routes/products.routes');

const port = process.env.PORT || 3333;

//middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

(async () => {
	try {
		await connectDb();
		app.listen(port, () => console.log(`App running on the port ${port}...`));
	} catch (error) {
		console.log(`Error starting the server: ${error}`);
	}
})();
