
var router = require("./getRouter")();
/**
 * Logovanje administratora
 */
router.post('/adminLogin', function(req, resp){
    
});

/**
 * Logovanje obicnog korisnika
 */
router.post('/userLogin', function(req, resp) {
    
});
      
router.get('/testGet', function(req, resp) {
      resp.end("Uspjeh");
});

module.exports = router;