
var defineProp = require("../controllers/modifyProps");

var Priority = (function(){   
    var nametovalue = {"Blocker":1,"Critical":2,"Major":3,"Minor":4,"Trivial":5};
    var valuetoname = {1:"Blocker",2:"Critical",3:"Major",4:"Minor",5:"Trivial"};
    var blocker = {};
    var critical = {};
    var major = {};
    var minor = {};
    var trivial = {};
    
    defineProp(blocker,"Blocker",nametovalue["Blocker"]);
    defineProp(critical,"Critical",nametovalue["Critical"]);
    defineProp(major,"Major",nametovalue["Major"]);
    defineProp(minor,"Minor",nametovalue["Minor"]);
    defineProp(trivial,"Trivial",nametovalue["Trivial"]);
    
    return {
        BLOCKER:blocker,
        CRITICAL:critical,
        MAJOR:major,
        MINOR:minor,
        TRIVIAL:trivial,
        getValueByName:function(name){
            if(!name)
                return null;
            return nametovalue[name];
        },
        getNameByValue:function(value){
            if(!value)
                return null;
            return valuetoname[value];
        }
    }
    
    
      
})();

module.exports = Priority;