const mongoose = require('mongoose');

const connectionEndpoint = (username, password, databaseName) =>
	`mongodb+srv://${username}:${password}@nodejsplatzi.cg57m.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const connectDB = url => {
	return mongoose.connect(
		connectionEndpoint(
			process.env.MONGODB_USERNAME,
			process.env.MONGODB_PASSWORD,
			process.env.MONGODB_DATABASE_NAME,
		),
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		},
	);
};

module.exports = connectDB;
