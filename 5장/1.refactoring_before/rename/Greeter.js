var Greeter = function(sMessage){
    this._sValue = sMessage;
};

Greeter.prototype = {

    sayHello : function(){
        return 'Hello ' + this._sValue;
    }
};