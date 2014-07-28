var Images = function(){
    this._oQuery = new Query();
    this._oSql = new ImagesSQL();
};

Images.prototype = {
    findBy : function(){
        // do something...
    },

    create : function(sUrl){
        var sSql = this._oSql.insert(sUrl);

        return this._oQuery.run(sSql).then(function(nImageId){
            return nImageId;
        });
    },

    update : function(){
        //do something
    },

    remove : function(){
        //do something
    }
};