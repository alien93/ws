/**
 * Registrovanje rest endpoint-a za aplikaciju
 */
module.exports = function(app){
    var loginRouter = require("./loginUser");
    app.use('/login', loginRouter);
}