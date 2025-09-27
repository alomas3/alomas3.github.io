/* GET uncle's travel packages view */
const travel = (req, res) => {
    res.render('travel', { title: 'Uncles Travel Agency'});
};

module.exports = {
    travel
};