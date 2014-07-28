/*ignore jslint start*/

/**
 * @param {RemoteControl} oRemoteControl RemoteControl 구현 객체
 * @implements RemoteControl
 * @abstract
 * @constructor
 */
var ExtendRemoteControl = function(oRemoteControl){
    this._oRemoteControl = oRemoteControl;
};

ExtendRemoteControl.prototype = {

    /**
     * @returns {string}
     */
    movie : function(){},

    /**
     * @returns {string}
     */
    music : function(){}
};

/*ignore jslint end*/