//Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./uncles');

//Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});