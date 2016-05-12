var MakeConstant = function defineProp(obj,name,value){
    Object.defineProperties(obj,{
        "name":{
            value:name,
            writable:false,
            configurable:false,
            enumerable:true
            
        },
        "value":{
            value:value,
            writable:false,
            configurable:false,
            enumerable:true
        }
    });
    return obj;
}

module.exports = MakeConstant;