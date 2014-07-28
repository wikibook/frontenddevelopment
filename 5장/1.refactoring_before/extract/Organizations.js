var Organizations = function(htOptions){
    this.execute(htOptions);
};

Organizations.prototype = {

    execute : function(htOptions){
        this._sApiOrganizations = htOptions.sApiOrganizations;
        this._composite = [];

        var self = this;

        $.ajax({
            url : this._sApiOrganizations,
            async : false
        }).then(function(aListData){
            var oOrganization,
                htOrganizations = {};

            _.each(aListData, function(htDataSet){
                oOrganization = new Organization(htDataSet);
                htOrganizations[oOrganization.id()] = oOrganization;
            });

            _.each(htOrganizations, function(oOrganization){
                if(oOrganization.isRoot()){
                    self._composite.push(oOrganization);
                }else{
                    htOrganizations[oOrganization.paretnId()].children(oOrganization);
                }
            });
        });
    }
};
