var Organizations = function(htOptions){
    this.execute(htOptions);
};

Organizations.prototype = {

    _makeOrganizations : function(aListData){
        var oOrganization,
            htOrganizations = {};

        _.each(aListData, function (htDataSet) {
            oOrganization = new Organization(htDataSet);
            htOrganizations[oOrganization.id()] = oOrganization;
        });
        return htOrganizations;
    },

    _composeOrganizations : function (htOrganizations){
        var self = this;

        _.each(htOrganizations, function (oOrganization) {
            if (oOrganization.isRoot()) {
                self._composite.push(oOrganization);
            } else {
                htOrganizations[oOrganization.paretnId()].children(oOrganization);
            }
        });
    },

    _requestList : function(){
        $.ajax({
            url: this._sApiOrganizations,
            async: false
        }).then(this._makeOrganizations.bind(this))
          .then(this._composeOrganizations.bind(this));
    },

    execute : function(htOptions){
        this._sApiOrganizations = htOptions.sApiOrganizations;
        this._composite = [];

        this._requestList();
    }
};
















