//permits reading from file
var fs = require('fs');

//trips variable contains trip information created in trips.json file
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET uncle's travel packages view */
const travel = (req, res) => {
    res.render('travel', { title: 'Uncles Travel Agency', trips});
};

module.exports = {
    travel
};