const {connect} = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const conStatus = {};

async function dbConnect() {
	if (conStatus.isConnected) {
		console.log("connect again?");
		return;
	}
	const db = await connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
  console.log("connect to database");
	conStatus.isConnected = db.connections[0].readyState;
}

module.exports = {dbConnect}