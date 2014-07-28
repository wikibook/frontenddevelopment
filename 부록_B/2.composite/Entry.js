/*ignore jslint start*/

/**
 * 파일 시스템 인터페이스
 * @interface
 */
var Entry = {

    /**
     * @returns {Array.<Entry>}
     */
    getChildren : function(){},

    /**
     * @param {Entry} oEntry
     */
    appendChild : function(oEntry){},

    /**
     * @param {Entry} oEntry
     */
    removeChild : function(oEntry){}
};

/*ignore jslint end*/