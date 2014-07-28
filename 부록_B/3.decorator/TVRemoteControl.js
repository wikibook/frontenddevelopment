/**
 * @param {string} sTVModel TV 모델 명
 * @implements RemoteControl
 * @constructor
 */
var TVRemoteControl = function(sTVModel){
    this.sTVModel = sTVModel;
};

TVRemoteControl.prototype = {

    /**
     * @returns {string}
     */
    on : function(){
        return this.sTVModel + '을 켰습니다.';
    },

    /**
     * @returns {string}
     */
    off : function(){
        return this.sTVModel + '을 껏습니다.';
    }
};