const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/*
//allows reading from the file
var fs = require('fs');

//
trips variable contains trip information created in trips.json file
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

*/

/* 
//GET uncle's travel packages view
const travel = (req, res) => {
    res.render('travel', { title: 'Uncles Travel Agency', trips});
};
 */

/*GET travel view */
const travel = async function(req, res, next){
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
           let message = null;
           if(!(json instanceof Array)){
            message = "API lookup error";
            json = [];
           } else {
                if(!json.length){
                    message = "No trips exist in our database!";
                }
           }
            res.render('travel', {title: "Uncle's Travel Packages", trips: json, message});
        })
        .catch((err) => res.status(500).send(err.message));
        //console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};