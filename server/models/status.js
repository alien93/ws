
var defineProp = require("../controllers/modifyProps");

var Status =(function() {
    var done = {};
    var todo = {};
    var verify = {};
    var inprogress = {};
    var namevalue = {"To Do":1,"In Progress":2,"Verify":3,"Done":4};
    var valuename = {1:"To Do",2:"In Progress",3:"Verify",4:"Done"};
    
    done = defineProp(done,"Done",namevalue["Done"]);
    defineProp(todo,"To Do",namevalue["To Do"]);
    defineProp(verify,"Verify",namevalue["Verify"]);
    defineProp(inprogress,"In Progress",namevalue["In Progress"]);
    
    console.log(done);
    
    return {
        TODO:todo,
        IN_PROGRESS:inprogress,
        VERIFY:verify,
        DONE:done,
        getValueByName:function(name){
            if(!name)
                return null;
            return namevalue[name];
        },
        getNameByValue:function(value){
            if(!value)
                return null;
            return valuename[value];
        }
    };
    
})();

module.exports = Status;