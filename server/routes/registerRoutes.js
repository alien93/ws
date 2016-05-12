/**
 * Registrovanje rest endpoint-a za aplikaciju
 */
module.exports = function(app){
    require("./loginUser")();
    var router = require("./getRouter");
    app.use('/rest', router);
}