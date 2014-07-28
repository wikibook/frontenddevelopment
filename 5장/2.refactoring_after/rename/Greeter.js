var Greeter = function(sMessage){
    this._sGreeting = sMessage;
};

Greeter.prototype = {

    greet : function(){
        return 'Hello ' + this._sGreeting;
    }
};

