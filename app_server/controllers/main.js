/*GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Uncle's Travel Agency"});
};

module.exports = {
    index
}