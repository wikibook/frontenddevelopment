/**
 * @param {string} sName 디렉터리 명
 * @implements Entry
 * @constructor
 */
var Directory = function(sName){
    this.sName = sName;
    this._entries = [];
};

Directory.prototype = {

    /**
     * @returns {Array.<Entry>}
     */
    getChildren : function(){
        return this._entries;
    },

    /**
     * @param {Entry} oEntry
     */
    appendChild : function(oEntry){
        this._entries.push(oEntry);
    },

    /**
     *
     * @param {Entry} oEntry
     */
    removeChild : function(oEntry){
        this._entries = _.without(this._entries, oEntry);
    }
};