const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

// CONNECTION_STRING = process.env.MONGO_URI || ''
CONNECTION_STRING =
	"mongodb+srv://myAtlasDBUser:NTB3KNCHDKN7WIK@myatlasclusteredu.oicbs.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

mongoose
	.connect(CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("DB Connected".blue))
	.catch((error) => console.log(`${error}`.bgRed));
