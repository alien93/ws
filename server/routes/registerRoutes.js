/**
 * Registrovanje rest endpoint-a za aplikaciju
 */
module.exports = function(app){
    var router = require("./getRouter");
    /*router.use(function(req, resp, next){
       console.log(req.url);
       var url = req.url;
       if(!req.session.user){
           if(url == "/userRegister" || url == "/userLogin" || url == "/adminLogin"){
                next();
           }else{
                resp.status(500).end("Niste ulogovani.");
            }
       }else{
           next();
       }
    });*/
    require("./loginUser")();
    require("./restAdmin")();
    require("./restUser")();
    app.use('/rest', router);
}