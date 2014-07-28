/**
 * @param {string} sName 파일명
 * @implements Entry
 * @constructor
 */
var File = function(sName){
    this.sName = sName;
};

File.prototype = {

    /**
     * @returns {null}
     */
    getChildren : function(){
        return null;
    },

    /**
     * @returns {boolean}
     */
    appendChild : function(){
        return false;
    },

    /**
     * @returns {boolean}
     */
    removeChild : function(){
        return false;
    }
};